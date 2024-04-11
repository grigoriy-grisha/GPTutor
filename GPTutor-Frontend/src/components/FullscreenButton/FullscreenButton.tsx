import { IconButton, Platform, usePlatform } from "@vkontakte/vkui";
import {
  Icon24FullscreenExit,
  Icon28FullscreenOutline,
} from "@vkontakte/icons";
import React from "react";
import { useFullScreen } from "$/hooks/useFullScreen";

function FullscreenButton() {
  const platform = usePlatform();
  const { isFullScreen, onFullScreen, offFullScreen } = useFullScreen();

  if (platform !== Platform.VKCOM) return null;

  return (
    <IconButton onClick={isFullScreen ? offFullScreen : onFullScreen}>
      {isFullScreen ? (
        <Icon24FullscreenExit width={28} height={28} />
      ) : (
        <Icon28FullscreenOutline />
      )}
    </IconButton>
  );
}

export default FullscreenButton;
