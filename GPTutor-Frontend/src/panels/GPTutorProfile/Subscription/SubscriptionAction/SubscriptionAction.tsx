import React from "react";
import { subscriptionsController } from "$/entity/subscriptions";
import { Button, Spacing } from "@vkontakte/vkui";
import { Icon24LockOpenOutline } from "@vkontakte/icons";
import { useNavigationContext } from "$/NavigationContext";

function SubscriptionAction() {
  const { goBack } = useNavigationContext();
  const subscription = subscriptionsController.subscription$.get();

  if (!subscriptionsController.isDisable()) {
    if (!subscription) return null;

    const isActive = subscription.active;

    if (!isActive) {
      return (
        <div>
          <Button
            style={{ width: "100%" }}
            size="m"
            appearance="positive"
            onClick={async () => {
              await subscriptionsController.resume("subscription_2");
            }}
          >
            Возообновить подписку
          </Button>
          <Spacing size={12} />
          <Button onClick={goBack} size="m" mode="outline">
            Вернуться назад
          </Button>
        </div>
      );
    }

    if (isActive) {
      return (
        <div>
          <Button
            style={{ width: "100%" }}
            size="m"
            mode="outline"
            appearance="negative"
            onClick={async () => {
              await subscriptionsController.cancel("subscription_2");
            }}
          >
            Приостановить подписку
          </Button>
          <Spacing size={12} />
          <Button onClick={goBack} size="m" mode="outline">
            Вернуться назад
          </Button>
        </div>
      );
    }
  }

  console.log(subscriptionsController.isDisable());
  if (subscriptionsController.isDisable()) {
    return (
      <div>
        <Button
          size="m"
          before={<Icon24LockOpenOutline />}
          style={{
            width: "100%",
            background: "var(--vkui--color_accent_orange--active)",
            color: "#FF8C00 !important",
          }}
          onClick={async () => {
            await subscriptionsController.create("subscription_2");
          }}
        >
          Получить подписку
        </Button>
        <Spacing size={12} />
        <Button onClick={goBack} size="m" mode="outline">
          Вернуться назад
        </Button>
      </div>
    );
  }

  return null;
}

export default SubscriptionAction;
