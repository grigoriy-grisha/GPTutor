import React from "react";
import { Banner } from "@vkontakte/vkui";
import { appController } from "../../../../entity/app";

function WaitBanner() {
  if (!appController.showWaitBanner$.get()) return null;

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
