import bridge from "@vkontakte/vk-bridge";

class ShareService {
  shareLink(url: string) {
    console.log(`{photo}{548334196}_{${url}}`);
    bridge
      .send("VKWebAppShowWallPostBox", {
        message:
          "Генерирую нейрокартинки в Stable Art!. https://vk.com/app51602327",
        attachments:
          "https://cdn2.stablediffusionapi.com/generations/46acd46f-004d-4c58-884f-ce4e9796cdf6-0.png",
      })
      .then((data) => {
        console.log(data);
      });
  }
}

export const shareService = new ShareService();
