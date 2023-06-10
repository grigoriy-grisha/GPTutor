import { sig } from "dignals";

import { UUID_V4 } from "$/entity/common";

import ReactivePromise from "$/services/ReactivePromise";
import { deleteHistory, getHistoryById } from "$/api/history";
import { snackbarNotify } from "$/entity/notify";
import { History } from "$/entity/history";

export class GptHistoryDialogs {
  deleteHistory$ = ReactivePromise.create((id: string) => deleteHistory(id));
  getHistory$ = ReactivePromise.create(getHistoryById);

  dialogs = sig<History[]>([]);

  async loadHistory() {
    const history = await this.getHistory$.run();

    this.dialogs.set(
      history.sort(
        (a, b) =>
          new Date(a.lastUpdated).valueOf() - new Date(b.lastUpdated).valueOf()
      )
    );
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
