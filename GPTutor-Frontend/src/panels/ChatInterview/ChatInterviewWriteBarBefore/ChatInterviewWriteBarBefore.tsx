import React from "react";
import { WriteBarIcon } from "@vkontakte/vkui";
import { Icon28ListBulletSquareOutline } from "@vkontakte/icons";

interface IProps {
  onClickList: () => void;
}

function ChatInterviewWriteBarBefore({ onClickList }: IProps) {
  return (
    <WriteBarIcon aria-label="Открыть все вопросы" onClick={onClickList}>
      <Icon28ListBulletSquareOutline />
    </WriteBarIcon>
  );
}

export default ChatInterviewWriteBarBefore;
