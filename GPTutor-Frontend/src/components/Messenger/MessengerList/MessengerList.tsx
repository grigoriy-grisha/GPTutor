import { Button, Placeholder } from "@vkontakte/vkui";
import React, { memo } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

import { Message } from "./Message";

import classes from "./MessengerList.module.css";

interface IProps {
  chatGpt: ChatGptTemplate;
  onStartChat: () => void;
  placeholderHeader?: string;
  startText?: string;

  startIsDisabled?: boolean;
  placeholderText?: string;
}

function MessengerList({
  chatGpt,
  onStartChat,
  placeholderHeader,
  startText,
  startIsDisabled,
  placeholderText,
}: IProps) {
  const messages = chatGpt.messages$.get();
  const isStopped = chatGpt.timer.isStopped$.get();
  const isDisableUsing = !chatGpt.subscriptionGPT.$isAllowSendMessage.get();
  const blockActions = chatGpt.isBlockActions$.get();

  if (messages.length === 0) {
    return (
      <div className={classes.placeholderContainer}>
        <Placeholder
          header={placeholderHeader || "Начните диалог"}
          action={
            <Button
              disabled={
                startIsDisabled || !isStopped || isDisableUsing || blockActions
              }
              aria-label={startText || "Начать"}
              mode="outline"
              size="m"
              onClick={onStartChat}
            >
              {startText || "Начать"}
            </Button>
          }
        >
          {placeholderText || "Запустите бота"}
        </Placeholder>
      </div>
    );
  }

  return (
    <div className={classes.messagesContainer}>
      {messages.map((message, index) => (
        <Message key={index} chatGpt={chatGpt} message={message} />
      ))}
    </div>
  );
}

export default memo(MessengerList);
