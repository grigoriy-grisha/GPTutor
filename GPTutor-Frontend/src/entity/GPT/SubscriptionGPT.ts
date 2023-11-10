import { VkStorageService } from "$/services/VkStorageService";
import { memo, sig } from "dignals";
import { communicationService } from "$/services/CommunicationService";

export class SubscriptionGPT {
  storageService = new VkStorageService();
  $attempts = sig(0);
  isSubscribe$ = sig(false);

  constructor() {
    this.$initAttempts();
    this.initSubscription();
  }

  async $initAttempts() {
    const attempts = await this.storageService.get("attempts1");
    if (attempts) return this.$attempts.set(Number(attempts));
    this.storageService.set("attempts1", String(10));
    this.$attempts.set(10);
  }

  async initSubscription() {
    this.isSubscribe$.set(await communicationService.getIsMember());
  }

  $handleSendMessage() {
    if (this.$attempts.get() <= 0) return;
    this.$attempts.set(this.$attempts.get() - 1);
    this.storageService.set("attempts1", String(this.$attempts.get()));
  }

  $subscribe = async () => {
    const isSubscribe = await communicationService.addToSubscribe();
    this.isSubscribe$.set(isSubscribe);
  };

  $isAllowSendMessage = memo(
    () => this.isSubscribe$.get() || this.$attempts.get() > 0
  );
}
