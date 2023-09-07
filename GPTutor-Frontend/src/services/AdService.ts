import bridge from "@vkontakte/vk-bridge";

class AdService {
  showBannerAd() {
    bridge.send("VKWebAppShowBannerAdResult" as any).then((res) => {
      console.log(res, "asdasd");
    });

    bridge
      .send("VKWebAppShowBannerAd", {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        banner_location: "bottom",
      })
      .then((res) => {
        console.log(res, "asdasd");
      })
      .catch((error) => console.log(error, "asdasdasdasdasd"));
  }
}

export const adService = new AdService();
