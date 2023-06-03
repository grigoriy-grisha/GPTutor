import { batch, memo, sig } from "dignals";

import { sendChatCompletions } from "$/api/completions";
import ReactivePromise from "$/services/ReactivePromise";

import { GPTDialogHistoryData, GPTDialogHistoryType, GPTRoles } from "./types";
import { GptMessage } from "./GptMessage";
import { Timer } from "$/entity/GPT/Timer";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { ChapterTypes, lessonsController } from "$/entity/lessons";
import { UUID_V4 } from "$/entity/common";
import { moderationText } from "$/api/moderation";
import { createHistory } from "$/api/history";
import { applicationUser } from "$/entity/user/ApplicationUser";
import { HistoryCreate } from "$/entity/history/types";
import { createMessage, getMessagesById } from "$/api/messages";
import { History } from "$/entity/history";

const errorContent = `
\`\`\`javascript
Сеть ChatGPT пегружена. Попробуйте через минуту
   _______  GPT
  |.-----.|       Err 
  ||x . x||  GPT Error  
  ||_.-._||         GPT
  \`--)-(--\`  GPT Er
 __[=== o]___       Error
|:::::::::::|\\   ror GPT
\`-=========-\`() 
`;

const MAX_CONTEXT_WORDS = 2000;
const REPEAT_WORDS = ["eщe", "повтори", "повтор", "repeat"];

//todo рефакторинг, разнести этот класс на несколько сущностей
export class ChatGpt {
  isBlockActions$ = sig(false);

  apiKey: string = "";
  currentHistory: History | null = null;
  readonly initialSystemContent =
    "Ты программист с опытом веб разработки в 10 лет, отвечаешь на вопросы джуниора, который хочет научиться программированию, добавляй правильную подсветку кода, указывай язык для блоков кода";
  systemMessage = new GptMessage(this.initialSystemContent, GPTRoles.system);

  timer = new Timer(10, 0, "decrement");

  history = new GptHistoryDialogs();

  messages$ = sig<GptMessage[]>([]);

  sendCompletions$ = ReactivePromise.create(() => this.sendCompletion());

  createHistory$ = ReactivePromise.create((params: HistoryCreate) =>
    createHistory(params)
  );

  getMessages$ = ReactivePromise.create((historyId: string) =>
    getMessagesById(historyId)
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

    if (this.lastMessageIsRepeat()) {
      await this.sendChatCompletions(message);
      return;
    }

    await this.sendChatCompletions(message);
  }

  async sendChatCompletions(message: GptMessage) {
    const result = await sendChatCompletions(
      this.apiKey,
      { model: "gpt-3.5-turbo-0301", messages: this.getMessages() },
      this.onMessage(message),
      () => {
        this.addMessage(
          new GptMessage(errorContent, GPTRoles.assistant, true, true)
        );
        this.sendCompletions$.reset();
      },
      this.abortController
    );

    this.checkOnRunOutOfMessages();

    return result;
  }

  async moderateMessage(message?: GptMessage) {
    if (!message) return;

    const moderation = await moderationText(
      message.content$.get(),
      this.apiKey
    );

    const isFailedModeration = moderation.results[0].flagged;

    message.failedModeration$.set(isFailedModeration);

    if (isFailedModeration) {
      message.content$.set("Данное сообщение пришлось скрыть");
    }

    return moderation.results[0].flagged;
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
      isError: !!message.isError,
      role: message.role,
      content: message.content$.get(),
      isFailedModeration: !message.failedModeration$.get(),
    });
  }

  toApiMessage = (message: GptMessage) => ({
    content: message.content$.get(),
    role: message.role,
  });

  filterInMemoryMessages(messages: GptMessage[]) {
    return messages.filter((message) => !message.inLocal);
  }

  getLastUserMessage() {
    return [...this.messages$.get()]
      .reverse()
      .find((message) => message.role === GPTRoles.user);
  }

  getLastMessage() {
    return this.messages$.get().at(-1);
  }

  lastMessageIsRepeat() {
    const messageContent = this.getLastUserMessage()?.content$.get();
    if (!messageContent || messageContent.length > 10) return false;
    return REPEAT_WORDS.find((word) => messageContent.search(word));
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
      userVkId: applicationUser.user!.id,
      lessonName: data?.lessonName || "",
      type,
    });
  }

  getChatData(): GPTDialogHistoryData {
    const currentChapter = lessonsController.currentChapter.get();
    const currentLesson = lessonsController.currentLesson.get();

    if (!currentChapter?.chapterType || !currentLesson?.name) return null;

    return {
      chapterType: currentChapter.chapterType,
      lessonName: currentLesson.name,
    };
  }

  async restoreDialogFromHistory(id: UUID_V4, goToChat: () => void) {
    const dialog = this.history.getDialogById(id);
    if (!dialog) return;

    const messages = await this.getMessages$.run(id);

    if (dialog.lessonName && dialog.type) {
      lessonsController.setCurrentChapter(dialog.type as ChapterTypes);
      lessonsController.setCurrentLessonByName(dialog.lessonName);
    }

    this.messages$.set(
      messages.map((message) => {
        const gptMessage = new GptMessage(
          message.content,
          message.role as GPTRoles,
          false,
          message.isError
        );

        gptMessage.failedModeration$.set(message.isFailedModeration);

        return gptMessage;
      })
    );

    goToChat();

    // const foundDialog = this.history.getDialogById(id);
    // if (!foundDialog) return;
    //
    // this.currentDialog = foundDialog.id;
    // this.systemMessage.content$.set(foundDialog.systemMessage.content);
    // this.messages.ts$.set(
    //   foundDialog.messages.ts.map((message) => {
    //     const message$ = new GptMessage(
    //       message.content,
    //       message.role,
    //       message.inLocal
    //     );
    //     message$.failedModeration$.set(message.isFailModeration);
    //
    //     return message$;
    //   })
    // );
    //
    // const data = foundDialog.data;
    // if (data) {
    //   lessonsController.setCurrentChapter(data.chapterType);
    //   lessonsController.setCurrentLessonByName(data.lessonName);
    // }
    //
    // this.sendCompletions$.reset();
  }
}

export const chatGpt = new ChatGpt();
