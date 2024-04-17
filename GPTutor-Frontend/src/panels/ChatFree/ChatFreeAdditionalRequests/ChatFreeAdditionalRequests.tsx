import React from "react";
import { Button, Div, Separator } from "@vkontakte/vkui";

import classes from "./ChatFreeAdditionalRequests.module.css";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import { gptModels } from "$/entity/GPT/GptModels";

interface IProps {
  handleSend: (value: string) => void;
}

function ChatFreeAdditionalRequests({ handleSend }: IProps) {
  const { goToChatSettingsModal } = useNavigationContext();

  const isTyping = chatGpt.chatGptFree.sendCompletions$.loading.get();
  const isStopped = chatGpt.chatGptFree.timer.isStopped$.get();
  const hasMessages = chatGpt.chatGptFree.messages$.get().length !== 0;

  const isDisabled = isTyping || !isStopped || !hasMessages;
  return (
    <>
      <Separator wide />
      <Div className={classes.additionalRequests}>
        <Button onClick={() => goToChatSettingsModal()} mode="outline">
          Модель: {gptModels.getModel()}
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() =>
            handleSend(chatGpt.chatGptFree.getLastUserMessage()!.content$.get())
          }
        >
          Повтор последнего сообщения
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleSend("Продолжи, где остановился")}
        >
          Продолжи, где остановился
        </Button>
        <Button disabled={isDisabled} onClick={() => handleSend("Еще")}>
          Еще
        </Button>
      </Div>
    </>
  );
}

export default ChatFreeAdditionalRequests;
