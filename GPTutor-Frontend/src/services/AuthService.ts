import bridge from "@vkontakte/vk-bridge";
import { appService } from "$/services/AppService";

class AuthService {
  token = "";

  async setupToken() {
    await bridge
      .send("VKWebAppGetAuthToken", {
        app_id: appService.isStableArt() ? 51692825 : 51602327,
        scope: "wall,groups,photos",
      })
      .then((data) => {
        console.log(data, "data");
        if (data.access_token) {
          this.token = data.access_token;
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }
}

export const authService = new AuthService();
