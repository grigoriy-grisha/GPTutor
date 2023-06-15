import { Icon28ListBulletSquareOutline } from "@vkontakte/icons";
import { WriteBarIcon } from "@vkontakte/vkui";
import React from "react";

interface IProps {
  onClick: () => void;
}

function ChatLeetCodeWriteBarBefore({ onClick }: IProps) {
  return (
    <WriteBarIcon aria-label="Открыть условие задачи" onClick={onClick}>
      <Icon28ListBulletSquareOutline />
    </WriteBarIcon>
  );
}

export default ChatLeetCodeWriteBarBefore;
