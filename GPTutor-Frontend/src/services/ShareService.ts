import bridge from "@vkontakte/vk-bridge";

class ShareService {
  shareLink(url: string) {
    bridge
      .send("VKWebAppShowWallPostBox", {
        message: "Генерирую нейрокартинки в Stable Art!",
        attachments: url,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const shareService = new ShareService();
