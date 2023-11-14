import { getSubscription } from "$/api/subscriptions";
import bridge from "@vkontakte/vk-bridge";

class SubscriptionService {
  async subscription(action: "create" | "resume" | "cancel") {
    await bridge
      .send("VKWebAppShowSubscriptionBox", {
        action,
        item: "subscription_1",
      })
      .catch((error) => {
        console.log(
          error,
          "________________________error VKWebAppShowSubscriptionBox"
        );
      });
  }
  create() {
    return this.subscription("create");
  }
  cancel() {
    return this.subscription("cancel");
  }

  resume() {
    return this.subscription("resume");
  }
}

export const subscriptionService = new SubscriptionService();
