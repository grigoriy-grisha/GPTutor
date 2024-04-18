import React from "react";
import {
  Button,
  Div,
  HorizontalScroll,
  IconButton,
  Separator,
} from "@vkontakte/vkui";

import classes from "./ChatFreeAdditionalRequests.module.css";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import { gptModels } from "$/entity/GPT/GptModels";
import { Icon28WriteOutline } from "@vkontakte/icons";
import { additionalRequests } from "$/entity/additionalRequest/AdditionalRequests";

interface IProps {
  handleSend: (value: string) => void;
}

function ChatFreeAdditionalRequests({ handleSend }: IProps) {
  const { goToChatSettingsModal, goToAdditionalRequest } =
    useNavigationContext();

  const isTyping = chatGpt.chatGptFree.sendCompletions$.loading.get();
  const isStopped = chatGpt.chatGptFree.timer.isStopped$.get();
  const hasMessages = chatGpt.chatGptFree.messages$.get().length !== 0;

  const isDisabled = isTyping || !isStopped || !hasMessages;

  const requests = additionalRequests.getAvailableRequests();

  return (
    <>
      <Separator wide />
      <div className={classes.container}>
        <HorizontalScroll>
          <Div
            className={classes.additionalRequests}
            style={{
              gridTemplateColumns: `repeat(${
                requests?.length + 2
              }, max-content)`,
            }}
          >
            <Button
              className={classes.additionalRequest}
              onClick={() => goToChatSettingsModal()}
              mode="outline"
            >
              Модель: {gptModels.getModel()}
            </Button>
            <Button
              className={classes.additionalRequest}
              disabled={isDisabled}
              onClick={() =>
                handleSend(
                  chatGpt.chatGptFree.getLastUserMessage()!.content$.get()
                )
              }
            >
              Повтор последнего сообщения
            </Button>
            {requests.map((request) => (
              <Button
                key={request.id}
                className={classes.additionalRequest}
                disabled={isDisabled}
                onClick={() => handleSend(request.message$.get())}
              >
                {request.title$.get()}
              </Button>
            ))}
          </Div>
        </HorizontalScroll>
        <IconButton
          onClick={() => goToAdditionalRequest()}
          className={classes.edit}
        >
          <Icon28WriteOutline />
        </IconButton>
      </div>
    </>
  );
}

export default ChatFreeAdditionalRequests;
