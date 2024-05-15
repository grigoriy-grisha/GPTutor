import bridge from "@vkontakte/vk-bridge";
import { appService } from "$/services/AppService";

class AuthService {
  scope: string[] = [];
  token = "";

  async setupToken(scopeElem: string) {
    this.scope.push(scopeElem);

    await bridge
      .send("VKWebAppGetAuthToken", {
        app_id: appService.getAppId(),
        scope: this.scope.join(","),
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
