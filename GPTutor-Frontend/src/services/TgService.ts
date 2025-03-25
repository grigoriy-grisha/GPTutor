import { VkStorageService } from "$/services/VkStorageService";
import { sig } from "dignals";
import { appService } from "$/services/AppService";

class TgService {
  storage = new VkStorageService();

  isSeeTg$ = sig(false);

  constructor() {
    if (appService.isTG()) {
      this.isSeeTg$.set(true);
      return;
    }

    this.initHasNewModel();
  }

  async initHasNewModel() {
    const isSeeTg = await this.storage.get("isSeeIISet");
    this.isSeeTg$.set(!!isSeeTg);
  }

  setSeeTg() {
    this.storage.set("isSeeIISet", String(true));
    this.isSeeTg$.set(true);
  }
}

export const tgService = new TgService();
