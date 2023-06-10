import React from "react";

import {
  classNames,
  IconButton,
  PanelHeader,
  Platform,
  Title,
  usePlatform,
} from "@vkontakte/vkui";

import { Icon28ServicesOutline } from "@vkontakte/icons";

import { useNavigationContext } from "$/NavigationContext";

import classes from "./HomeHeader.module.css";

function HomeHeader() {
  const platform = usePlatform();
  const { openApplicationInfo } = useNavigationContext();

  return (
    <PanelHeader
      className={classNames(classes.panelHeader, {
        [classes.panelHeaderVkApps]: platform === Platform.VKCOM,
      })}
      before={
        <IconButton
          onClick={openApplicationInfo}
          className={classes.buttonService}
        >
          <Icon28ServicesOutline className={classes.iconService} />
        </IconButton>
      }
    >
      <div className={classes.wrapper}>
        <Title level="1">GPTutor</Title>
      </div>
    </PanelHeader>
  );
}

export default HomeHeader;
