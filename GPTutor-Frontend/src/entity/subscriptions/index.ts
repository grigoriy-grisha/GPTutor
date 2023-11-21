import { sig } from "dignals";
import { Subscription } from "$/entity/subscriptions/types";
import { subscriptionService } from "$/services/SubscriptionService";
import { adService } from "$/services/AdService";
import { getSubscription } from "$/api/subscriptions";

const wait = () => new Promise((r) => setTimeout(r, 2000));

class SubscriptionsController {
  subscription$ = sig<Subscription | null>(null);
  async getSubscription() {
    try {
      const result = await getSubscription();
      if (result.error) return;

      this.subscription$.set(result);
      await this.hideAd();
    } catch (error) {
      console.log(error);
    }
  }

  async hideAd() {
    if (!this.isDisable()) {
      await adService.hideBannerAd();
    }
  }

  isDisable() {
    return new Date() < this.getExpireDate();
  }

  getExpireDate() {
    const subscription = this.subscription$.get();
    if (!subscription) return new Date();

    return new Date(subscription.expire * 1000);
  }

  async create() {
    await subscriptionService.create();
    await wait();
    await this.getSubscription();
  }

  async cancel() {
    await subscriptionService.cancel(this.subscription$.get()!.subscriptionId);
    await wait();
    await this.getSubscription();
  }

  async resume() {
    await subscriptionService.resume(this.subscription$.get()!.subscriptionId);
    await wait();
    await this.getSubscription();
  }
}

export const subscriptionsController = new SubscriptionsController();
