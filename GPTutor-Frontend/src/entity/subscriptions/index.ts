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
    return new Date() > this.getExpireDate();
  }

  getExpireDate() {
    const subscription = this.subscription$.get();
    if (!subscription) return new Date();

    return new Date(subscription.expire * 1000);
  }

  async createTryGetSubscription(attempt: number) {
    if (attempt === 4) return;

    await wait();
    await this.getSubscription();

    if (!this.isDisable() && this.subscription$.get()?.active) return;

    await this.createTryGetSubscription(attempt + 1);
  }

  async cancelTryGetSubscription(attempt: number) {
    if (attempt === 4) return;

    await wait();
    await this.getSubscription();

    if (!this.isDisable() && !this.subscription$.get()?.active) return;

    await this.createTryGetSubscription(attempt + 1);
  }

  async create() {
    await subscriptionService.create();
    await this.createTryGetSubscription(1);
  }

  async cancel() {
    await subscriptionService.cancel(this.subscription$.get()!.subscriptionId);
    await this.cancelTryGetSubscription(1);
  }

  async resume() {
    await subscriptionService.resume(this.subscription$.get()!.subscriptionId);
    await wait();
    await this.createTryGetSubscription(1);
  }
}

export const subscriptionsController = new SubscriptionsController();
