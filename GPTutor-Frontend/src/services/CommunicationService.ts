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
          type: "success",
          message: "Вы уже подписаны.",
        });
        return true;
      }
      await bridge.send("VKWebAppJoinGroup", { group_id: 220371433 });
      return true;
    } catch (error) {
      snackbarNotify.notify({
        type: "error",
        message: "Вы не были подписаны на группу!",
      });

      console.log(error, "asd;lkas;ldk;laskd;laks;dlkas;ldkl+___A_SD_ASD_");

      return false;
    }
  }
  async addToFavorite() {
    const isFavorite = this.getSearchParams().get("vk_is_favorite");
    if (isFavorite === "1") {
      snackbarNotify.notify({
        type: "success",
        message: "Приложение уже в избранном",
      });
      return;
    }
    await bridge.send("VKWebAppAddToFavorites");
  }

  async getIsMember() {
    if (!this.isMember) {
      this.isMember = await this.userIsMember();
    }
    return this.isMember;
  }

  async userIsMember(): Promise<boolean> {
    const urlParams = this.getSearchParams();
    const userId = urlParams.get("vk_user_id")!;
    const groupId = "220371433"; // ID группы

    return await groupsIsMember({ groupId, userId });
  }

  private getSearchParams() {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
  }
}

export const communicationService = new CommunicationService();
