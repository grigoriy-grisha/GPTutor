import React from "react";
import { WriteBarIcon } from "@vkontakte/vkui";
import { Icon28BracketsSlashSquareOutline } from "@vkontakte/icons";

interface IProps {
  onOpenEditor: () => void;
}

function ChatTrainerWriteBarBefore({ onOpenEditor }: IProps) {
  return (
    <WriteBarIcon aria-label="Открыть редактор" onClick={onOpenEditor}>
      <Icon28BracketsSlashSquareOutline />
    </WriteBarIcon>
  );
}

export default ChatTrainerWriteBarBefore;
