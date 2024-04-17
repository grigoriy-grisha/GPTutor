import { Badge, WriteBarIcon } from "@vkontakte/vkui";
import { Icon28SettingsOutline } from "@vkontakte/icons";
import React from "react";

import classes from "./ChatFreeWriteBarBefore.module.css";
import { chatGpt } from "$/entity/GPT";

interface IProps {
  onSettingsClick: () => void;
}

function ChatFreeWriteBarBefore({ onSettingsClick }: IProps) {
  return (
    <WriteBarIcon onClick={onSettingsClick} className={classes.container}>
      <Icon28SettingsOutline />
      {!chatGpt.hasNewModel && (
        <Badge mode="prominent" className={classes.badge}>
          Новый раздел
        </Badge>
      )}
    </WriteBarIcon>
  );
}

export default ChatFreeWriteBarBefore;
