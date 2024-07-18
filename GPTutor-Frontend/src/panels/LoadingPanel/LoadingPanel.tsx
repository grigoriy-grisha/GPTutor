import React from "react";
import {
  Div,
  Platform,
  PlatformType,
  Spinner,
  usePlatform,
} from "@vkontakte/vkui";

import classes from "./LoadingPanel.module.css";
import { ChatGPTLogo, StableArtLogo } from "$/icons";
import { appService } from "$/services/AppService";

function getLoadingLogo(platform: PlatformType) {
  if (appService.isGPTutor()) {
    return (
      <ChatGPTLogo
        size={platform === Platform.VKCOM ? 96 : 56}
        borderRadius="20px"
      />
    );
  }

  if (appService.isStableArt()) {
    return (
      <StableArtLogo
        size={platform === Platform.VKCOM ? 96 : 56}
        borderRadius="20px"
      />
    );
  }

  return null;
}
function LoadingPanel() {
  const platform = usePlatform();

  return (
    <Div className={classes.loading}>
      <div>
        {getLoadingLogo(platform)}

        <Spinner size="medium" className={classes.spinner} />
      </div>
    </Div>
  );
}

export default LoadingPanel;
