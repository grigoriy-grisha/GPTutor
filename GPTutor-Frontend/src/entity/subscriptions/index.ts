import { sig } from "dignals";
import { Subscription } from "$/entity/subscriptions/types";
import { subscriptionService } from "$/services/SubscriptionService";
import { adService } from "$/services/AdService";
import { getSubscription, updateSubscription } from "$/api/subscriptions";

const wait = () => new Promise((r) => setTimeout(r, 2000));

class SubscriptionsController {
  subscription$ = sig<Subscription | null>(null);
  async getSubscription(subscriptionName: string) {
    try {
      const result = await getSubscription(subscriptionName);
      if (result.error) return;

      this.subscription$.set(result);
      await this.hideAd();
    } catch (error) {
      console.log(error);
    }
  }

  async updateSubscription(subscriptionName: string) {
    try {
      const result = await updateSubscription(subscriptionName);
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
    return false;
  }

  getExpireDate() {
    const subscription = this.subscription$.get();
    if (!subscription) return new Date();

    return new Date(subscription.expire * 1000);
  }

  async createTryGetSubscription(attempt: number, subscriptionName: string) {
    if (attempt === 4) return;

    await wait();
    await this.updateSubscription(subscriptionName);

    if (!this.isDisable() && this.subscription$.get()?.active) return;

    await this.createTryGetSubscription(attempt + 1, subscriptionName);
  }

  async cancelTryGetSubscription(attempt: number, subscriptionName: string) {
    if (attempt === 4) return;

    await wait();
    await this.updateSubscription(subscriptionName);

    if (!this.isDisable() && !this.subscription$.get()?.active) return;

    await this.createTryGetSubscription(attempt + 1, subscriptionName);
  }

  async create(subscriptionName: string) {
    await subscriptionService.create(subscriptionName);
    await this.createTryGetSubscription(1, subscriptionName);
  }

  async cancel(subscriptionName: string) {
    await subscriptionService.cancel(this.subscription$.get()!.subscriptionId);
    await this.cancelTryGetSubscription(1, subscriptionName);
  }

  async resume(subscriptionName: string) {
    await subscriptionService.resume(this.subscription$.get()!.subscriptionId);
    await wait();
    await this.createTryGetSubscription(1, subscriptionName);
  }
}

export const subscriptionsController = new SubscriptionsController();
