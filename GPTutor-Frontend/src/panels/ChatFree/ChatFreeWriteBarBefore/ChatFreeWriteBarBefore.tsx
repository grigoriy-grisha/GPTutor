import { WriteBarIcon } from "@vkontakte/vkui";
import { Icon28SettingsOutline } from "@vkontakte/icons";
import React from "react";

interface IProps {
  onSettingsClick: () => void;
}

function ChatFreeWriteBarBefore({ onSettingsClick }: IProps) {
  return (
    <WriteBarIcon onClick={onSettingsClick}>
      <Icon28SettingsOutline />
    </WriteBarIcon>
  );
}

export default ChatFreeWriteBarBefore;
