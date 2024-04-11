import React from "react";

import { IconButton, Platform, Title, usePlatform } from "@vkontakte/vkui";

import {
  Icon24FullscreenExit,
  Icon28FullscreenOutline,
  Icon28ServicesOutline,
} from "@vkontakte/icons";

import { useNavigationContext } from "$/NavigationContext";

import { AppPanelHeader } from "$/components/AppPanelHeader";

import classes from "./HomeHeader.module.css";
import { useFullScreen } from "$/hooks/useFullScreen";

function HomeHeader() {
  const { openApplicationInfo } = useNavigationContext();
  const platform = usePlatform();

  const { isFullScreen, onFullScreen, offFullScreen } = useFullScreen();

  return (
    <AppPanelHeader
      before={
        <IconButton
          onClick={openApplicationInfo}
          className={classes.buttonService}
        >
          <Icon28ServicesOutline className={classes.iconService} />
        </IconButton>
      }
      after={
        platform === Platform.VKCOM && (
          <IconButton onClick={isFullScreen ? offFullScreen : onFullScreen}>
            {isFullScreen ? (
              <Icon24FullscreenExit width={28} height={28} />
            ) : (
              <Icon28FullscreenOutline />
            )}
          </IconButton>
        )
      }
    >
      <div className={classes.wrapper}>
        <Title level="1" Component="h1">
          GPTutor
        </Title>
      </div>
    </AppPanelHeader>
  );
}

export default HomeHeader;
