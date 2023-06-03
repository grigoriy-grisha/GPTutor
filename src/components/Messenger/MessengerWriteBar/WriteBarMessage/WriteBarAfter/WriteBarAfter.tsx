import React, { useState } from "react";

import { useAppearance, WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
  Icon28Send,
} from "@vkontakte/icons";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";

import { ChatGpt } from "$/entity/GPT";

import ClearMessagesAlert from "./ClearMessagesAlert";
import Time from "$/components/Time";

import classes from "./WriteBarAfter.module.css";

interface IProps {
  chatGpt: ChatGpt;
  sendMessage: () => void;
  value: string;
}

function WriteBarAfter({ chatGpt, value, sendMessage }: IProps) {
  const appearance = useAppearance();

  const isTyping = chatGpt.sendCompletions$.loading.get();

  const [showAlert, setShowAlert] = useState(false);
  const timerIsStopped = chatGpt.timer.isStopped$.get();
  const time = chatGpt.timer.time$.get();

  const removeDialogDisable =
    chatGpt.messages$.get().length < 2 ||
    chatGpt.history.getHistory$.loading.get() ||
    isTyping;

  const sendBars = (
    <>
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

  return (
    <div className={classes.container}>
      {showAlert && (
        <ClearMessagesAlert
          closeAlert={() => setShowAlert(false)}
          applySettings={() => {
            if (!chatGpt.currentHistory) return;

            chatGpt.history
              .removeHistoryDialog(chatGpt.currentHistory.id)
              .then(() => {
                chatGpt.clearMessages();
                setShowAlert(false);
              });
          }}
        />
      )}
      <WriteBarIcon
        onClick={() => setShowAlert(true)}
        disabled={removeDialogDisable}
      >
        <Icon28DeleteOutline />
      </WriteBarIcon>
      {timerIsStopped ? (
        sendBars
      ) : (
        <TextTooltip
          appearance={appearance === "light" ? "accent" : "white"}
          style={{ maxWidth: 150 }}
          text="Подождите, пока истечет время для отправки следующего сообщения"
        >
          <div>
            <Time seconds={time} />
          </div>
        </TextTooltip>
      )}
    </div>
  );
}

export default WriteBarAfter;
