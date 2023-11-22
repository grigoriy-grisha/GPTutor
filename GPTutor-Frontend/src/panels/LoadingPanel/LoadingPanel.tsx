import React from "react";
import { Div, Platform, Spinner, usePlatform } from "@vkontakte/vkui";

import classes from "./LoadingPanel.module.css";
import { ChatGPTLogo, StableArtLogo } from "$/icons";
import { appService } from "$/services/AppService";

function LoadingPanel() {
  const platform = usePlatform();

  return (
    <Div className={classes.loading}>
      <div>
        {appService.isGPTutor() ? (
          <ChatGPTLogo
            size={platform === Platform.VKCOM ? 96 : 56}
            borderRadius="20px"
          />
        ) : (
          <StableArtLogo
            size={platform === Platform.VKCOM ? 96 : 56}
            borderRadius="20px"
          />
        )}

        <Spinner size="medium" className={classes.spinner} />
      </div>
    </Div>
  );
}

export default LoadingPanel;
