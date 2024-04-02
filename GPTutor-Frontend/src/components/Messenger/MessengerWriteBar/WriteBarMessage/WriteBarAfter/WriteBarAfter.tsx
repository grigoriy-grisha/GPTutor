import React from "react";

import { Button, Tooltip, useAppearance, WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
  Icon28Send,
} from "@vkontakte/icons";
import Time from "$/components/Time";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";

import classes from "./WriteBarAfter.module.css";

interface IProps {
  chatGptModel: ChatGptTemplate;
  sendMessage: () => void;
  value: string;
  hideDeleteDialog?: boolean;
}

function WriteBarAfter({
  chatGptModel,
  value,
  sendMessage,
  hideDeleteDialog,
}: IProps) {
  const { openAlert, goBack, goToGPTutorProfile } = useNavigationContext();
  const appearance = useAppearance();

  const isTyping = chatGptModel.sendCompletions$.loading.get();

  const timerIsStopped = chatGptModel.timer.isStopped$.get();
  const time = chatGptModel.timer.time$.get();

  const removeDialogDisable =
    chatGptModel.messages$.get().length < 2 || isTyping;

  const blockActions = chatGptModel.isBlockActions$.get();

  const applySettings = () => {
    if (!chatGptModel.currentHistory) return;

    chatGpt.history
      .removeHistoryDialog(chatGptModel.currentHistory.id)
      .then(() => {
        chatGptModel.clearMessages();
        goBack();
      });
  };

  const sendBars = (
    <>
      {!isTyping ? (
        <WriteBarIcon
          aria-label="Отправить сообщение"
          disabled={value.trim().length === 0 || isTyping || blockActions}
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
      {!hideDeleteDialog && (
        <WriteBarIcon
          onClick={() =>
            openAlert({
              onAction: applySettings,
              actionText: "Удалить диалог",
              header: "Подтвердите действие",
              text: "Вы уверены? Диалог нельзя будет вернуть!",
            })
          }
          disabled={removeDialogDisable || blockActions}
        >
          <Icon28DeleteOutline />
        </WriteBarIcon>
      )}
      {timerIsStopped ? (
        sendBars
      ) : (
        <div className={classes.containerButtons}>
          <Button
            onClick={goToGPTutorProfile}
            size="s"
            mode="tertiary"
            className={classes.skipButton}
          >
            Отключить
          </Button>
          <Tooltip
            appearance={appearance === "light" ? "accent" : "white"}
            style={{ maxWidth: 150 }}
            text="Подождите, пока истечет время для отправки следующего сообщения"
          >
            <div>
              <Time seconds={time} />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default WriteBarAfter;
