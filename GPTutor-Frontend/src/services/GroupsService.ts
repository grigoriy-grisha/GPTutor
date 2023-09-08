import bridge from "@vkontakte/vk-bridge";
import { authService } from "$/services/AuthService";

class GroupsService {
  isDon: undefined | boolean = undefined;

  async checkIsDon() {
    if (this.isDon !== undefined) return this.isDon;

    await bridge
      .send("VKWebAppCallAPIMethod", {
        method: "donut.isDon",
        params: {
          owner_id: "-220371433",
          v: "5.131",
          access_token: authService.token,
        },
      })
      .then((data) => {
        this.isDon = Boolean(data?.response);
      })
      .catch((error) => {
        this.isDon = false;
        console.log(error);
      });

    return this.isDon;
  }
}

export const groupsService = new GroupsService();
