import { batch, memo, sig } from "dignals";

import { sendChatCompletions } from "$/api/completions";
import ReactivePromise from "$/services/ReactivePromise";

import { GPTDialogHistoryData, GPTDialogHistoryType, GPTRoles } from "./types";
import { GptMessage } from "./GptMessage";
import { Timer } from "$/entity/GPT/Timer";
import { lessonsController, ModeType } from "$/entity/lessons";
import { createHistory } from "$/api/history";
import { createMessage, getMessagesById } from "$/api/messages";
import { History } from "$/entity/history";
import { snackbarNotify } from "$/entity/notify";
import { interviews } from "$/entity/interview";
import { leetCode } from "$/entity/leetCode/LeetCode";

const MAX_CONTEXT_WORDS = 4000;
export abstract class ChatGptTemplate {
  isBlockActions$ = sig(false);

  currentHistory: History | null = null;
  readonly initialSystemContent =
    "Ты программист с опытом веб разработки в 10 лет, отвечаешь на вопросы джуниора, который хочет научиться программированию, добавляй правильную подсветку кода, указывай язык для блоков кода";
  systemMessage = new GptMessage(this.initialSystemContent, GPTRoles.system);

  timer = new Timer(10, 0, "decrement");

  messages$ = sig<GptMessage[]>([]);

  delayTimeout: NodeJS.Timeout | null = null;

  sendCompletions$ = ReactivePromise.create(() => {
    this.delayTimeout = setTimeout(() => this.isDelay$.set(true), 8000);

    return this.sendCompletion();
  });

  createHistory$ = ReactivePromise.create(createHistory);

  getMessages$ = ReactivePromise.create(getMessagesById);

  isDelay$ = sig(false);

  inLocalMessages$ = memo(() =>
    this.messages$.get().filter((message) => message.inLocal)
  );

  selectedMessages$ = memo(() =>
    this.messages$.get().filter((message) => message.isSelected$.get())
  );

  getRunOutOfContextMessages$ = memo(() =>
    this.messages$.get().filter((message) => message.isRunOutOfContext.get())
  );

  getIsNotRunOutOfContextMessages$ = memo(() =>
    this.messages$.get().filter((message) => !message.isRunOutOfContext.get())
  );

  hasSelectedMessages$ = memo(() => this.selectedMessages$.get().length !== 0);

  abortController = new AbortController();

  closeDelay() {
    this.delayTimeout && clearTimeout(this.delayTimeout);
    this.isDelay$.set(false);
  }

  clearMessages = () => {
    this.abortSend();
    this.messages$.set([]);
    this.currentHistory = null;
  };

  clearSystemMessage = () => {
    this.systemMessage?.content$.set(this.initialSystemContent);
  };

  abortSend = () => {
    this.abortController.abort();
  };

  blockActions = () => {
    this.isBlockActions$.set(true);
  };

  allowActions = () => {
    this.isBlockActions$.set(false);
  };

  send = async (content: string) => {
    try {
      this.sendCompletions$.loading.set(true);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);
      await this.createHistory();
      await this.postMessage(message);

      await this.sendCompletions$.run();
    } finally {
      this.timer.run();
      this.allowActions();
      await this.postMessage(this.getLastMessage());
    }
  };

  private async sendCompletion() {
    const message = new GptMessage("", GPTRoles.assistant);

    this.abortController = new AbortController();

    await this.sendChatCompletions(message);
  }

  async sendChatCompletions(message: GptMessage) {
    const result = await sendChatCompletions(
      { model: "gpt-3.5-turbo-16k", messages: this.getMessages() },
      this.onMessage(message),
      () => {
        this.closeDelay();
        this.addMessage(
          new GptMessage(
            "Сеть ChatGPT перегружена. Попробуйте через минуту",
            GPTRoles.assistant,
            false,
            true
          )
        );
        this.sendCompletions$.reset();
      },
      this.abortController
    );

    this.checkOnRunOutOfMessages();

    return result;
  }

  checkOnRunOutOfMessages() {
    [...this.messages$.get()].reverse().reduce((acc, message) => {
      if (acc > MAX_CONTEXT_WORDS) {
        message.toggleRunOutOff();
        return acc;
      }
      return acc + message.content$.get().split(" ").length;
    }, 0);
  }

  onMessage = (message: GptMessage) => (value: string, isFirst: boolean) => {
    this.closeDelay();

    if (isFirst) {
      message.onSetMessageContent(value);
      this.addMessage(message);
      return;
    }
    message.onSetMessageContent(value);
  };

  getMessages() {
    if (!this.systemMessage) {
      return this.filterInMemoryMessages(
        this.getIsNotRunOutOfContextMessages$.get()
      ).map(this.toApiMessage);
    }

    return this.filterInMemoryMessages([
      this.systemMessage,
      ...this.getIsNotRunOutOfContextMessages$.get(),
    ]).map(this.toApiMessage);
  }

  clearSelectedMessages = () => {
    batch(() => {
      this.selectedMessages$
        .get()
        .forEach((message) => message.toggleSelected());
    });
  };

  addMessage(message: GptMessage) {
    this.messages$.set([...this.messages$.get(), message]);
  }

  async postMessage(message?: GptMessage) {
    if (!this.currentHistory || !message) return;

    await createMessage({
      historyId: this.currentHistory.id,
      error: !!message.isError,
      role: message.role,
      content: message.content$.get(),
      isFailedModeration: !message.failedModeration$.get(),
      lastUpdated: new Date(),
      inLocal: !!message.inLocal,
    });
  }

  toApiMessage = (message: GptMessage) => ({
    content: message.content$.get(),
    role: message.role,
  });

  filterInMemoryMessages(messages: GptMessage[]) {
    return messages.filter((message) => !message.inLocal || !message.isError);
  }

  getLastUserMessage() {
    return [...this.messages$.get()]
      .reverse()
      .find((message) => message.role === GPTRoles.user);
  }

  getLastMessage() {
    const messages = this.messages$.get();
    return messages[messages.length - 1];
  }

  async createHistory() {
    const lastMessage = this.getLastMessage();
    if (!lastMessage) return;

    const data = this.getChatData();

    const type = !data ? GPTDialogHistoryType.Free : data.chapterType;

    const lengthMessages = this.messages$.get().length;
    if (lengthMessages > 1) return;

    this.currentHistory = await this.createHistory$.run({
      systemMessage: this.systemMessage.content$.get(),
      lastMessage: lastMessage.content$.get(),
      lessonName: data?.lessonName || "",
      lastUpdated: new Date(),
      type,
    });
  }

  getChatData(): GPTDialogHistoryData {
    if (leetCode.currentProblem) {
      return {
        chapterType: ModeType.LeetCode,
        lessonName: leetCode.currentProblemSlug,
      };
    }

    const type = interviews.getCurrentInterview()?.type;

    if (type) return { chapterType: type, lessonName: null };

    const currentChapter = lessonsController.currentChapter.get();
    const currentLesson = lessonsController.currentLesson.get();

    if (!currentChapter?.type || !currentLesson?.name) return null;

    return {
      chapterType: currentChapter.type,
      lessonName: currentLesson.name,
    };
  }

  async prepareDialog(dialog: History) {
    if (dialog.type === ModeType.LeetCode) {
      await leetCode.loadDetailProblem(dialog.lessonName);
    }

    if (dialog.lessonName && dialog.type) {
      lessonsController.setCurrentChapter(dialog.type as ModeType);
      lessonsController.setCurrentLessonByName(dialog.lessonName);
      return;
    }
    if (dialog.type === ModeType.HTMLCSS_INTERWIEW) {
      interviews.setCurrentInterview(dialog.type as ModeType);
      return;
    }

    lessonsController.clearChapter();
    lessonsController.clearLesson();
  }
  //todo рефакторинг
  async restoreDialogFromHistory(dialog: History, goToChat: () => void) {
    this.closeDelay();

    this.currentHistory = dialog;

    const messages = await this.getMessages$.run(dialog.id);

    if (this.getMessages$.error.get()) {
      return snackbarNotify.notify({
        type: "error",
        message: "Ошибка при переходе в диплог",
      });
    }

    await this.prepareDialog(dialog);

    this.messages$.set(
      messages.map((message) => {
        const gptMessage = new GptMessage(
          message.content,
          message.role as GPTRoles,
          false,
          message.error
        );

        gptMessage.failedModeration$.set(message.isFailedModeration);

        return gptMessage;
      })
    );

    this.checkOnRunOutOfMessages();
    goToChat();
  }
}
