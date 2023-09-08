import bridge from "@vkontakte/vk-bridge";

class AuthService {
  token = "";

  async setupToken() {
    await bridge
      .send("VKWebAppGetAuthToken", {
        app_id: 51602327,
        scope: "groups",
      })
      .then((data) => {
        if (data.access_token) {
          this.token = data.access_token;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const authService = new AuthService();
