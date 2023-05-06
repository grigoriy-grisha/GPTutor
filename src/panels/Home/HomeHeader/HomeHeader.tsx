import React from "react";

import { IconButton, PanelHeader, Title } from "@vkontakte/vkui";

import { GithubIcon } from "$/icons";

import classes from "./HomeHeader.module.css";

interface IProps {
  goToOpenSource: () => void;
}

function HomeHeader({ goToOpenSource }: IProps) {
  return (
    <PanelHeader
      before={
        <IconButton className={classes.githubIcon} onClick={goToOpenSource}>
          <GithubIcon />
        </IconButton>
      }
    >
      <Title level="1">GPTutor</Title>
    </PanelHeader>
  );
}

export default HomeHeader;
