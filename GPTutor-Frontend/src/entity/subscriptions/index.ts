import { sig } from "dignals";

import { getSubscription } from "$/api/subscriptions";
import { Subscription } from "$/entity/subscriptions/types";
import { subscriptionService } from "$/services/SubscriptionService";
import { adService } from "$/services/AdService";

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
    const subscription = this.subscription$.get();
    if (!subscription?.lastUpdated) return true;

    const originalDate = new Date(subscription?.lastUpdated);

    return !(originalDate < this.getExpireDate());
  }

  getExpireDate() {
    const subscription = this.subscription$.get();
    const originalDate = new Date(subscription!.lastUpdated!);

    originalDate.setHours(originalDate.getHours() + 3);

    const futureDate = new Date(originalDate);
    futureDate.setDate(futureDate.getDate() + 30);

    return futureDate;
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
