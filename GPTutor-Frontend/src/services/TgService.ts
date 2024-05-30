import { VkStorageService } from "$/services/VkStorageService";
import { sig } from "dignals";

class TgService {
  storage = new VkStorageService();

  isSeeTg$ = sig(false);

  constructor() {
    this.initHasNewModel();
  }

  async initHasNewModel() {
    const isSeeTg = await this.storage.get("isSeeTg");
    this.isSeeTg$.set(!!isSeeTg);
  }

  setSeeTg() {
    this.storage.set("isSeeTg", String(true));
    this.isSeeTg$.set(true);
  }
}

export const tgService = new TgService();
