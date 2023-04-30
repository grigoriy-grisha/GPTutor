import React from "react";

import { IconButton, PanelHeader } from "@vkontakte/vkui";

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
      GPTutor
    </PanelHeader>
  );
}

export default HomeHeader;
