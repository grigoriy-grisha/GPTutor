import React, { useState } from "react";

import { useAppearance, WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
  Icon28Send,
} from "@vkontakte/icons";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";

import ClearMessagesAlert from "./ClearMessagesAlert";
import Time from "$/components/Time";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { chatGpt } from "$/entity/GPT";

import classes from "./WriteBarAfter.module.css";

interface IProps {
  chatGptModel: ChatGptTemplate;
  sendMessage: () => void;
  value: string;
}

function WriteBarAfter({ chatGptModel, value, sendMessage }: IProps) {
  const appearance = useAppearance();

  const isTyping = chatGptModel.sendCompletions$.loading.get();

  const [showAlert, setShowAlert] = useState(false);
  const timerIsStopped = chatGptModel.timer.isStopped$.get();
  const time = chatGptModel.timer.time$.get();

  const removeDialogDisable =
    chatGptModel.messages$.get().length < 2 || isTyping;

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
        <WriteBarIcon onClick={chatGptModel.abortSend}>
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
            if (!chatGptModel.currentHistory) return;

            chatGpt.history
              .removeHistoryDialog(chatGptModel.currentHistory.id)
              .then(() => {
                chatGptModel.clearMessages();
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
