import { sig } from "dignals";

import { getSubscription } from "$/api/subscriptions";
import { Subscription } from "$/entity/subscriptions/types";

class SubscriptionsController {
  subscription$ = sig<Subscription | null>(null);
  async getSubscription() {
    try {
      const result = await getSubscription();
      if (result.error) return;

      this.subscription$.set(result);
    } catch (error) {
      console.log(error);
    }
  }

  isDisable() {
    const subscription = this.subscription$.get();
    console.log(subscription);
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
}

export const subscriptionsController = new SubscriptionsController();
