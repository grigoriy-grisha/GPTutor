import { memo, sig } from "dignals";

import { UUID_V4 } from "$/entity/common";

import ReactivePromise from "$/services/ReactivePromise";
import {
  deleteAllHistory,
  deleteHistory,
  getHistoryById,
  updateHistory,
} from "$/api/history";
import { snackbarNotify } from "$/entity/notify";
import { History } from "$/entity/history";
import { chatGpt } from "$/entity/GPT/ChatGpt";
import { downloadMessagesUrl, getMessagesById } from "$/api/messages";
import { downloadService } from "$/services/DownloadService";

export class GptHistoryDialogs {
  deleteHistory$ = ReactivePromise.create(deleteHistory);
  deleteAllHistory$ = ReactivePromise.create(deleteAllHistory);
  getHistory$ = ReactivePromise.create(getHistoryById);

  getMessages$ = ReactivePromise.create(getMessagesById);

  dialogs = sig<History[]>([]);
  searchValue$ = sig("");

  pageNumber = 0;

  hasNextHistory$ = memo(() => {
    const result = chatGpt.history.getHistory$.result.get();
    if (result === undefined) return true;
    return !result.last;
  });

  async loadHistory() {
    this.pageNumber = 0;
    const history = await this.getHistory$.run(
      this.pageNumber,
      this.searchValue$.get().trim()
    );
    this.dialogs.set(history.content);
  }

  async nextLoadHistory() {
    if (!chatGpt.history.hasNextHistory$.get()) return;

    this.pageNumber++;
    const history = await this.getHistory$.run(
      this.pageNumber,
      this.searchValue$.get().trim()
    );

    this.dialogs.set([...this.dialogs.get(), ...history.content]);
  }

  setSearchValue = (value: string) => {
    console.log(value);
    this.searchValue$.set(value);
  };

  search = async () => {
    await this.loadHistory();
  };

  async removeAllHistories() {
    try {
      await this.deleteAllHistory$.run();

      snackbarNotify.notify({
        type: "success",
        message: "История успешно удалена",
      });

      this.dialogs.set([]);
    } catch (e) {
      snackbarNotify.notify({
        type: "error",
        message: "Произошла ошибка при удалении!",
      });
    }
  }

  async removeHistoryDialog(id: UUID_V4) {
    try {
      await this.deleteHistory$.run(id);

      const history = this.dialogs.get();
      const historyDialogs = history.filter((item) => item.id !== id);

      this.dialogs.set(historyDialogs);

      snackbarNotify.notify({
        type: "success",
        message: "История успешно удалена",
      });

      if (this.dialogs.get().length === 0) {
        await this.nextLoadHistory();
      }
    } catch (e) {
      snackbarNotify.notify({
        type: "error",
        message: "Произошла ошибка при удалении истории",
      });
    }
  }

  getDialogById(id: UUID_V4 | null) {
    if (id === null) return undefined;
    return this.dialogs.get().find((dialog) => dialog.id === id);
  }

  async downloadDialogAsTXT(id: UUID_V4) {
    const foundDialog = this.getDialogById(id);

    await downloadService.downloadByLink(
      downloadMessagesUrl("txt", id),
      `${foundDialog?.type} ${foundDialog?.lastUpdated}.txt`
    );
  }

  async downloadDialogAsJSON(id: UUID_V4) {
    const foundDialog = this.getDialogById(id);

    await downloadService.downloadByLink(
      downloadMessagesUrl("json", id),
      `${foundDialog?.type} ${foundDialog?.lastUpdated}.json`
    );
  }

  updateHistoryTitle(id: string, title: string) {
    this.dialogs.set(
      this.dialogs.get().map((item) => {
        if (item.id === id) {
          return { ...item, title };
        }
        return item;
      })
    );

    const dialog = this.getDialogById(id);
    if (!dialog) return;

    updateHistory(dialog);
  }
}
