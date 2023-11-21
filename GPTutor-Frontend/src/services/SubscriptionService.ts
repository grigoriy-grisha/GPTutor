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
    return bridge.send("VKWebAppShowSubscriptionBox", {
      action: "create",
      item: "subscription_1",
    });
  }
  cancel(subscription_id: string) {
    return bridge.send("VKWebAppShowSubscriptionBox", {
      action: "cancel",
      subscription_id,
    });
  }

  resume(subscription_id: string) {
    return bridge.send("VKWebAppShowSubscriptionBox", {
      action: "resume",
      subscription_id,
    });
  }
}

export const subscriptionService = new SubscriptionService();
