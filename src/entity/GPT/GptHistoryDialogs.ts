import { sig } from "dignals";

import { UUID_V4 } from "$/entity/common";

import { GPTDialogHistory } from "./types";
import ReactivePromise from "$/services/ReactivePromise";
import { deleteHistory, getHistoryById } from "$/api/history";
import { applicationUser } from "$/entity/user/ApplicationUser";

export class GptHistoryDialogs {
  deleteHistory$ = ReactivePromise.create((id: string) => deleteHistory(id));
  getHistory$ = ReactivePromise.create((userVkId) => getHistoryById(userVkId));

  dialogs = sig<GPTDialogHistory[]>([]);

  async loadHistory() {
    if (!applicationUser.user) return;
    const history = await this.getHistory$.run(applicationUser.user?.id);
    this.dialogs.set(history);
  }

  async removeHistoryDialog(id: UUID_V4) {
    await this.deleteHistory$.run(id);

    const history = this.dialogs.get();
    const historyDialogs = history.filter((item) => item.id !== id);

    this.dialogs.set(historyDialogs);
  }

  getDialogById(id: UUID_V4 | null) {
    if (id === null) return undefined;
    return this.dialogs.get().find((dialog) => dialog.id === id);
  }
}
