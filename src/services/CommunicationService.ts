import bridge from "@vkontakte/vk-bridge";
import { snackbarNotify } from "$/entity/notify";
import { groupsIsMember } from "$/api/vk";

class CommunicationService {
  private isMember = false;
  async addToSubscribe() {
    try {
      const isMember = await this.getIsMember();
      if (isMember) {
        snackbarNotify.notify({
          type: "error",
          message: "Вы уже подписаны.",
        });
        return;
      }
      await bridge.send("VKWebAppJoinGroup", { group_id: 220371433 });
    } catch (error) {
      snackbarNotify.notify({
        type: "error",
        message: "Невозможно подписаться.",
      });
      console.log(error);
    }
  }
  async addToFavorite() {
    const isFavorite = this.getSearchParams().get("vk_is_favorite");
    if (isFavorite === "1") {
      snackbarNotify.notify({
        type: "error",
        message: "Невозможно добавить в избранное.",
      });
      return;
    }
    await bridge.send("VKWebAppAddToFavorites");
  }

  private async getIsMember() {
    const urlParams = this.getSearchParams();
    const userId = urlParams.get("vk_user_id")!;
    const groupId = "220371433"; // ID группы
    if (!this.isMember) {
      this.isMember = await groupsIsMember({ groupId, userId });
    }
    return this.isMember;
  }

  private getSearchParams() {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
  }
}

export const communicationService = new CommunicationService();
