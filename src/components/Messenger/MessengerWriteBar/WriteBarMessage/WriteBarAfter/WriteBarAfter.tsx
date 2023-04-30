import { WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
} from "@vkontakte/icons";
import React from "react";

interface IProps {
  isTyping: boolean;
  abortSend: () => void;
  clearMessages: () => void;
  sendMessage: () => void;
  value: string;
}

function WriteBarAfter({
  clearMessages,
  isTyping,
  value,
  sendMessage,
  abortSend,
}: IProps) {
  return (
    <>
      <WriteBarIcon onClick={clearMessages}>
        <Icon28DeleteOutline />
      </WriteBarIcon>
      {!isTyping ? (
        <WriteBarIcon
          mode="send"
          aria-label="Отправить сообщение"
          disabled={value.length === 0 || isTyping}
          onClick={sendMessage}
        />
      ) : (
        <WriteBarIcon onClick={abortSend}>
          <Icon28CancelCircleOutline
            fill="var(--vkui--color_icon_accent)"
            width={28}
            height={28}
          />
        </WriteBarIcon>
      )}
    </>
  );
}

export default WriteBarAfter;
