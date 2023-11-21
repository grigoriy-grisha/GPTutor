import { sig } from "dignals";
import {
  OrderSubscriptionItem,
  OrderSubscriptionResponseData,
} from "$/entity/subscriptions/types";
import { subscriptionService } from "$/services/SubscriptionService";
import { adService } from "$/services/AdService";
import { getUserSubscriptions } from "$/api/vk";
import { generateImage } from "$/api/images";
import { imageGeneration } from "$/entity/image";

const wait = () => new Promise((r) => setTimeout(r, 2000));

class SubscriptionsController {
  subscription$ = sig<OrderSubscriptionItem | null>(null);
  async getSubscription() {
    try {
      const result = await this.getOrderSubscription();
      if (!result) return;

      this.subscription$.set(result);
      await this.hideAd();
    } catch (error) {
      console.log(error);
    }
  }

  async hideAd() {
    if (!this.isDisable()) {
      await adService.hideBannerAd();
      imageGeneration.samples$.set(4);
      return;
    }

    imageGeneration.samples$.set(1);
  }

  isDisable() {
    const subscription = this.subscription$.get();
    if (!subscription?.expire_time) return true;

    return new Date(subscription?.expire_time * 1000) < new Date();
  }

  getExpireDate() {
    const subscription = this.subscription$.get();
    if (!subscription) return null;

    return new Date(subscription?.expire_time);
  }

  async create() {
    await subscriptionService.create();
    await wait();
    await this.getSubscription();
  }

  async cancel() {
    await subscriptionService.cancel(String(this.subscription$.get()!.id));
    await wait();
    await this.getSubscription();
  }

  async resume() {
    await subscriptionService.resume(String(this.subscription$.get()!.id));
    await wait();
    await this.getSubscription();
  }

  async getOrderSubscription() {
    const data = await getUserSubscriptions();
    return this.getLastSubscription(data);
  }

  getLastSubscription(data: OrderSubscriptionResponseData) {
    if (data.response.items.length === 0) return null;

    return data.response.items
      .filter(({ app_id }) => app_id === 51692825)
      .reduce((prev, current) => (prev.id > current.id ? prev : current));
  }
}

export const subscriptionsController = new SubscriptionsController();
