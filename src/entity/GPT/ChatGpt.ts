import { batch, memo, sig } from "dignals";

import {
  getChatCompletions,
  sendChatCompletions,
  setCacheCompletions,
} from "$/api/completions";
import ReactivePromise from "$/services/ReactivePromise";

import { GPTDialogHistoryData, GPTDialogHistoryType, GPTRoles } from "./types";
import { GptMessage } from "./GptMessage";
import { Timer } from "$/entity/GPT/Timer";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { lessonsController } from "$/entity/lessons";
import { UUID_V4 } from "$/entity/common";

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
  currentDialog: UUID_V4 | null = null;
  initialSystemContent =
    "Ты программист с опытом веб разработки в 10 лет, отвечаешь на вопросы джуниора, который хочет научиться программированию, добавляй правильную подсветку кода, указывай язык для блоков кода";
  systemMessage = new GptMessage(this.initialSystemContent, GPTRoles.system);

  timer = new Timer(10, 0, "decrement");

  history = new GptHistoryDialogs();

  messages$ = sig<GptMessage[]>([]);

  sendCompletions$ = ReactivePromise.create(() => this.sendCompletion());

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
  };

  clearSystemMessage = () => {
    this.systemMessage?.content$.set(this.initialSystemContent);
  };

  abortSend = () => {
    this.abortController.abort();
  };

  send = async (content: string) => {
    this.addMessage(new GptMessage(content, GPTRoles.user));
    this.addMessageToHistory();
    await this.sendCompletions$.run();
    this.timer.run();
    this.addMessageToHistory();
  };

  private async sendCompletion() {
    const message = new GptMessage("", GPTRoles.assistant);

    this.abortController = new AbortController();

    if (this.lastMessageIsRepeat()) {
      await this.sendChatCompletions(message);
      return;
    }

    const hasCompletionInCache = await getChatCompletions({
      conversationName: String(this.getLastUserMessage()?.content$.get()),
      onMessage: this.onMessage(message),
      abortController: this.abortController,
    });

    if (hasCompletionInCache) {
      this.checkOnRunOutOfMessages();
      return;
    }

    const isHasError = await this.sendChatCompletions(message);

    if (isHasError) return;
    if (this.abortController.signal.aborted) return;

    await setCacheCompletions({
      message: String(this.getLastAssistantMessage()?.content$.get()),
      name: String(this.getLastUserMessage()?.content$.get()),
    });
  }

  async sendChatCompletions(message: GptMessage) {
    const result = await sendChatCompletions(
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

  getLastAssistantMessage() {
    return [...this.messages$.get()]
      .reverse()
      .find((message) => message.role === GPTRoles.assistant);
  }

  lastMessageIsRepeat() {
    const messageContent = this.getLastUserMessage()?.content$.get();
    if (!messageContent || messageContent.length > 10) return false;
    return REPEAT_WORDS.find((word) => messageContent.search(word));
  }

  addMessageToHistory() {
    const lastMessage = this.getLastMessage();
    if (!lastMessage) return;

    const data = this.getChatData();
    const type = data ? GPTDialogHistoryType.Free : GPTDialogHistoryType.Lesson;

    const foundDialog = this.history.getDialogById(this.currentDialog);

    if (!foundDialog) {
      const dialog = this.history.addToHistoryDialog({
        systemMessage: this.systemMessage,
        messages: this.messages$.get(),
        type,
        data,
      });

      this.currentDialog = dialog.id;
      return;
    }

    this.history.addMessageToHistoryDialog(foundDialog.id, lastMessage);
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

  restoreDialogFromHistory(id: UUID_V4) {
    const foundDialog = this.history.getDialogById(id);
    if (!foundDialog) return;

    this.currentDialog = foundDialog.id;

    this.messages$.set(
      foundDialog.messages.map(
        (message) =>
          new GptMessage(message.content, message.role, message.inLocal)
      )
    );

    const data = foundDialog.data;
    if (data) {
      lessonsController.setCurrentChapter(data.chapterType);
      lessonsController.setCurrentLessonByName(data.lessonName);
    }

    this.sendCompletions$.reset();
  }
}

export const chatGpt = new ChatGpt();
