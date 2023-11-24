import { getAttempts, sendFreeAttempts } from "$/api/attempts";
import { sig } from "dignals";
import bridge, { EAdsFormats } from "@vkontakte/vk-bridge";
import { snackbarNotify } from "$/entity/notify";
import { VkStorageService } from "$/services/VkStorageService";

class Attempts {
  $requests = sig(10);
  $attemptsToFree = sig(10);

  storage = new VkStorageService();

  async getAttempts() {
    const result = await getAttempts();
    this.$requests.set(result.requests);
    this.$attemptsToFree.set(result.freeAttempts);

    return result.requests;
  }

  watchAd = async () => {
    if (this.$attemptsToFree.get() === 0) {
      return;
    }

    bridge
      .send("VKWebAppShowNativeAds", {
        ad_format: EAdsFormats.INTERSTITIAL,
      })
      .then(async (data) => {
        console.log(data);

        const result = await sendFreeAttempts();
        this.$requests.set(result.requests);
        this.$attemptsToFree.set(result.freeAttempts);
      })
      .catch((error) => {
        snackbarNotify.notify({
          type: "error",
          message: "Не удалось запустить рекламу",
        });
      });
  };
}

export const attempts = new Attempts();
