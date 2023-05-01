import React, { useState } from "react";

import { WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
  Icon28Send,
} from "@vkontakte/icons";

import { ChatGpt } from "$/entity/GPT";

import ClearMessagesAlert from "./ClearMessagesAlert";

interface IProps {
  chatGpt: ChatGpt;

  isTyping: boolean;
  sendMessage: () => void;
  value: string;
}

function WriteBarAfter({ chatGpt, isTyping, value, sendMessage }: IProps) {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      {showAlert && (
        <ClearMessagesAlert
          closeAlert={() => setShowAlert(false)}
          applySettings={() => {
            chatGpt.clearMessages();
            setShowAlert(false);
          }}
        />
      )}
      <WriteBarIcon
        onClick={() => setShowAlert(true)}
        disabled={chatGpt.messages$.get().length === 0}
      >
        <Icon28DeleteOutline />
      </WriteBarIcon>
      {!isTyping ? (
        <WriteBarIcon
          aria-label="Отправить сообщение"
          disabled={value.length === 0 || isTyping}
          onClick={sendMessage}
        >
          <Icon28Send fill="var(--vkui--color_icon_accent)" />
        </WriteBarIcon>
      ) : (
        <WriteBarIcon onClick={chatGpt.abortSend}>
          <Icon28CancelCircleOutline fill="var(--vkui--color_icon_accent)" />
        </WriteBarIcon>
      )}
    </>
  );
}

export default WriteBarAfter;
