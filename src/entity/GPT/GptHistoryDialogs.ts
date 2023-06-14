import { memo, sig } from "dignals";

import { UUID_V4 } from "$/entity/common";

import ReactivePromise from "$/services/ReactivePromise";
import { deleteHistory, getHistoryById } from "$/api/history";
import { snackbarNotify } from "$/entity/notify";
import { History } from "$/entity/history";
import { chatGpt } from "$/entity/GPT/ChatGpt";

export class GptHistoryDialogs {
  deleteHistory$ = ReactivePromise.create((id: string) => deleteHistory(id));
  getHistory$ = ReactivePromise.create(getHistoryById);

  dialogs = sig<History[]>([]);

  pageNumber = 0;

  hasNextHistory$ = memo(() => {
    const result = chatGpt.history.getHistory$.result.get();
    if (result === undefined) return true;
    return !result.last;
  });

  async loadHistory() {
    this.pageNumber = 0;
    const history = await this.getHistory$.run(this.pageNumber);
    this.dialogs.set(history.content);
  }

  async nextLoadHistory() {
    this.pageNumber++;
    const history = await this.getHistory$.run(this.pageNumber);

    this.dialogs.set([...this.dialogs.get(), ...history.content]);
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
}
