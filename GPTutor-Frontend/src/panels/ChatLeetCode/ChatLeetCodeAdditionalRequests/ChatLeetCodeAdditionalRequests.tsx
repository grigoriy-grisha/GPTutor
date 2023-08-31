import React from "react";
import { Button, Div, Separator } from "@vkontakte/vkui";

import { chatGpt } from "$/entity/GPT";

import classes from "./ChatLeetCodeAdditionalRequests.module.css";

interface IProps {
  isStopped: boolean;
  handleSend: (value: string) => void;
}

function ChatLeetCodeAdditionalRequests({ handleSend, isStopped }: IProps) {
  const isTyping = chatGpt.chatGptLeetCode.sendCompletions$.loading.get();
  const isBlockActions = chatGpt.chatGptLeetCode.isBlockActions$.get();

  const isDisabled = isTyping || !isStopped;

  if (isBlockActions) return null;

  return (
    <>
      <Separator wide />
      <Div className={classes.additionalRequests}>
        <Button
          disabled={isDisabled}
          onClick={() => handleSend("Покажи решение задачи")}
        >
          Покажи решение
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() =>
            handleSend("Подскажи алгоритм действий для решения задачи")
          }
        >
          Подскажи алгоритм
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() =>
            handleSend(
              "Какие структуры данных и подходы мне нужно использовать для решения задачи"
            )
          }
        >
          Подскажи структуры данных
        </Button>
      </Div>
    </>
  );
}

export default ChatLeetCodeAdditionalRequests;
