import React from "react";

import { subscriptionsController } from "$/entity/subscriptions";
import { Button } from "@vkontakte/vkui";
import { Icon24LockOpenOutline } from "@vkontakte/icons";

function SubscriptionAction() {
  const subscriptionId =
    subscriptionsController.subscription$.get()!.subscriptionId!;
  const isActive = !!subscriptionsController.subscription$.get()?.isActive;

  if (isActive && !subscriptionsController.isDisable()) {
    return (
      <Button
        style={{ width: "100%" }}
        size="m"
        appearance="positive"
        onClick={() => subscriptionsController.resume()}
      >
        Возообновить подписку
      </Button>
    );
  }

  if (!isActive && !subscriptionsController.isDisable()) {
    return (
      <Button
        style={{ width: "100%" }}
        size="m"
        mode="outline"
        appearance="negative"
        onClick={() => subscriptionsController.cancel()}
      >
        Приостановить подписку
      </Button>
    );
  }

  if (subscriptionsController.isDisable()) {
    return (
      <Button
        size="m"
        before={<Icon24LockOpenOutline />}
        style={{
          width: "100%",
          background: "var(--vkui--color_accent_orange--active)",
          color: "#FF8C00 !important",
        }}
        onClick={() => subscriptionsController.create()}
      >
        Получить подпику
      </Button>
    );
  }

  return null;
}

export default SubscriptionAction;
