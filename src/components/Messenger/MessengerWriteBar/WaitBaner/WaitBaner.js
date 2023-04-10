import React from "react";
import { Banner } from "@vkontakte/vkui";

import { useSubscribe } from "../../../../hooks";
import { appController } from "../../../../entity/app";

function WaitBanner() {
  useSubscribe(appController.showWaitBanner$);

  if (!appController.showWaitBanner$.getValue()) return null;

  return (
    <Banner
      onDismiss={appController.closeWaitBanner}
      size="m"
      header="Запаситесь терпением :)"
      asideMode="dismiss"
      subheader={
        <span>Chat GPT может генерировать ответ достаточно долго</span>
      }
    />
  );
}

export default WaitBanner;
