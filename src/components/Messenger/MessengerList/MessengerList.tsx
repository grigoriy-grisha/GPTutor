import { Button, Placeholder } from "@vkontakte/vkui";
import React, { memo } from "react";

import { ChatGpt } from "$/entity/GPT";

import { Message } from "./Message";

import classes from "./MessengerList.module.css";

interface IProps {
  chatGpt: ChatGpt;
  isTyping: boolean;
  onStartChat: () => void;
}

function MessengerPlaceholder({
  chatGpt,
  onStartChat,
}: Omit<IProps, "isTyping">) {
  const isStopped = chatGpt.timer.isStopped$.get();

  return (
    <div className={classes.placeholderContainer}>
      <Placeholder
        header="Начните диалог"
        action={
          <Button
            disabled={!isStopped}
            aria-label="Начать диалог"
            mode="outline"
            size="m"
            onClick={onStartChat}
          >
            Начать
          </Button>
        }
      >
        Запустите бота стартовой фразой
      </Placeholder>
    </div>
  );
}

function MessengerList({ isTyping, chatGpt, onStartChat }: IProps) {
  const messages = chatGpt.messages$.get();

  if (messages.length === 0) {
    return <MessengerPlaceholder chatGpt={chatGpt} onStartChat={onStartChat} />;
  }

  return (
    <div className={classes.messagesContainer}>
      {messages.map((message, index) => (
        <Message
          key={index}
          chatGpt={chatGpt}
          message={message}
          isDisabled={messages.length - 1 === index && isTyping}
        />
      ))}
    </div>
  );
}

export default memo(MessengerList);
