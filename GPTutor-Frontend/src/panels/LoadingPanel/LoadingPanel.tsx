import React from "react";
import { Div, Platform, Spinner, usePlatform } from "@vkontakte/vkui";

import classes from "./LoadingPanel.module.css";
import { ChatGPTLogo } from "$/icons";

function LoadingPanel() {
  const platform = usePlatform();

  return (
    <Div className={classes.loading}>
      <div>
        <ChatGPTLogo
          size={platform === Platform.VKCOM ? 96 : 56}
          borderRadius="20px"
        />
        <Spinner size="medium" className={classes.spinner} />
      </div>
    </Div>
  );
}

export default LoadingPanel;
