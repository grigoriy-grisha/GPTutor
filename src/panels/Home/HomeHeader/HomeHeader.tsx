import React from "react";

import { IconButton, Title } from "@vkontakte/vkui";

import { Icon28ServicesOutline } from "@vkontakte/icons";

import { useNavigationContext } from "$/NavigationContext";

import { AppPanelHeader } from "$/components/AppPanelHeader";

import classes from "./HomeHeader.module.css";

function HomeHeader() {
  const { openApplicationInfo } = useNavigationContext();

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
    >
      <div className={classes.wrapper}>
        <Title level="1">GPTutor</Title>
      </div>
    </AppPanelHeader>
  );
}

export default HomeHeader;
