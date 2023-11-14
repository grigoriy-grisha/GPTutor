import bridge from "@vkontakte/vk-bridge";

class AdService {
  async showBannerAd() {
    bridge.send("VKWebAppShowBannerAdResult" as any).then((res) => {
      console.log(res, "asdasd");
    });

    await bridge
      .send("VKWebAppShowBannerAd", {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        banner_location: "bottom",
      })
      .then()
      .catch((error) => console.log(error, "asdasdasdasdasd"));
  }

  async hideBannerAd() {
    console.log("VKWebAppHideBannerAd");
    await bridge
      .send("VKWebAppHideBannerAd")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const adService = new AdService();
