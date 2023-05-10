import { sig } from "dignals";
import { v4 as uuid } from "uuid";

import { UUID_V4 } from "$/entity/common";

import {
  GPTDialogHistory,
  GPTDialogHistoryData,
  GPTDialogHistoryType,
  GPTMessage,
} from "./types";
import { GptMessage } from "./GptMessage";
import { StorageService } from "$/services/StorageService";

type ParamsAddHistoryDialog = {
  systemMessage: GptMessage;
  messages: GptMessage[];
  type: GPTDialogHistoryType;
  data: GPTDialogHistoryData;
};

type ParamsCreateHistoryDialog = ParamsAddHistoryDialog & {
  date: Date;
};

export class GptHistoryDialogs {
  private readonly HISTORY_KEY = "HISTORY_KEY";

  constructor(
    private storage: StorageService<GPTDialogHistory[]> = new StorageService()
  ) {
    this.init();
  }
  dialogs = sig<GPTDialogHistory[]>([]);

  searchedDialogs = this.dialogs;

  async init() {
    this.storage.get(this.HISTORY_KEY).then((result) => {
      if (result) this.dialogs.set(result);
    });
  }
  addToHistoryDialog({
    systemMessage,
    messages,
    data,
    type,
  }: ParamsAddHistoryDialog) {
    const dialog = this.createHistoryDialog({
      systemMessage,
      messages,
      data,
      type,
      date: new Date(),
    });

    this.dialogs.set([...this.dialogs.get(), dialog]);

    this.storage.set(this.HISTORY_KEY, this.dialogs.get());

    return dialog;
  }

  addMessageToHistoryDialog(id: UUID_V4, gptMessage: GptMessage) {
    const history = this.dialogs.get();
    const foundHistoryDialog = history.find((item) => item.id === id);
    if (!foundHistoryDialog) return;

    const lastMessage = this.mapGptMessageToDomain(gptMessage);

    foundHistoryDialog.date = new Date();
    foundHistoryDialog.messages = [...foundHistoryDialog.messages, lastMessage];
    foundHistoryDialog.lastMessage = lastMessage;

    this.storage.set(this.HISTORY_KEY, this.dialogs.get());
  }

  removeHistoryDialog(id: UUID_V4) {
    const history = this.dialogs.get();
    const historyDialogs = history.filter((item) => item.id !== id);

    this.dialogs.set(historyDialogs);
    this.storage.set(this.HISTORY_KEY, this.dialogs.get());
  }

  getLastHistoryDialog() {
    return this.dialogs.get().at(-1);
  }

  getDialogById(id: UUID_V4 | null) {
    if (id === null) return undefined;
    return this.dialogs.get().find((dialog) => dialog.id === id);
  }

  private createHistoryDialog({
    systemMessage,
    messages,
    type,
    data,
    date,
  }: ParamsCreateHistoryDialog): GPTDialogHistory {
    const lastDomainMessage = this.mapGptMessageToDomain(messages.at(-1)!);

    return {
      data,
      type: type,
      id: uuid(),
      date,
      lastMessage: lastDomainMessage,
      systemMessage: this.mapGptMessageToDomain(systemMessage),
      messages: messages.map(this.mapGptMessageToDomain),
    };
  }

  private mapGptMessageToDomain = (message: GptMessage): GPTMessage => {
    return {
      content: message.content$.get(),
      inLocal: !!message.inLocal,
      role: message.role,
    };
  };
}
