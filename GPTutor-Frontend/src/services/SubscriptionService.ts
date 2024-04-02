import bridge from "@vkontakte/vk-bridge";

class SubscriptionService {
  async subscription(action: "create" | "resume" | "cancel", item: string) {
    await bridge
      .send("VKWebAppShowSubscriptionBox", {
        action,
        item,
      })
      .catch((error) => {
        console.log(
          error,
          "________________________error VKWebAppShowSubscriptionBox"
        );
      });
  }
  create(item: string) {
    return bridge.send("VKWebAppShowSubscriptionBox", {
      action: "create",
      item,
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
