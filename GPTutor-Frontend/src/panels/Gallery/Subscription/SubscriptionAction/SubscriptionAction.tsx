import React from "react";

import { subscriptionsController } from "$/entity/subscriptions";
import { Button } from "@vkontakte/vkui";
import { Icon24LockOpenOutline } from "@vkontakte/icons";
import { subscriptionService } from "$/services/SubscriptionService";

function SubscriptionAction() {
  const isActive = !!subscriptionsController.subscription$.get()?.isActive;

  return (
    <div>
      <Button
        style={{ width: "100%" }}
        size="m"
        appearance="positive"
        onClick={() => subscriptionService.resume()}
      >
        Возообновить подписку
      </Button>
      <Button
        style={{ width: "100%" }}
        size="m"
        mode="outline"
        appearance="negative"
        onClick={() => subscriptionService.cancel()}
      >
        Приостановить подписку
      </Button>
      <Button
        size="m"
        before={<Icon24LockOpenOutline />}
        style={{
          width: "100%",
          background: "var(--vkui--color_accent_orange--active)",
          color: "#FF8C00 !important",
        }}
        onClick={() => subscriptionService.create()}
      >
        Получить подпику
      </Button>
    </div>
  );
  // if (isActive && !subscriptionsController.isDisable()) {
  //   return (
  //     <Button
  //       style={{ width: "100%" }}
  //       size="m"
  //       appearance="positive"
  //       onClick={() => subscriptionService.resume()}
  //     >
  //       Возообновить подписку
  //     </Button>
  //   );
  // }
  //
  // if (!isActive && !subscriptionsController.isDisable()) {
  //   return (
  //     <Button
  //       style={{ width: "100%" }}
  //       size="m"
  //       mode="outline"
  //       appearance="negative"
  //       onClick={() => subscriptionService.cancel()}
  //     >
  //       Приостановить подписку
  //     </Button>
  //   );
  // }
  //
  // if (subscriptionsController.isDisable()) {
  //   return (
  //     <Button
  //       size="m"
  //       before={<Icon24LockOpenOutline />}
  //       style={{
  //         width: "100%",
  //         background: "var(--vkui--color_accent_orange--active)",
  //         color: "#FF8C00 !important",
  //       }}
  //       onClick={() => subscriptionService.create()}
  //     >
  //       Получить подпику
  //     </Button>
  //   );
  // }
}

export default SubscriptionAction;
