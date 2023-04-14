import { Button, Placeholder } from "@vkontakte/vkui";
import React, { memo } from "react";

import { GptMessage } from "../../../entity/GPT/GptMessage";
import { Message } from "./Message";

import classes from "./MessengerList.module.css";

interface IProps {
  isTyping: boolean;
  messages: GptMessage[];
  onStartChat: () => void;
}

function MessengerList({ isTyping, messages, onStartChat }: IProps) {
  if (messages.length === 0) {
    return (
      <div className={classes.placeholderContainer}>
        <Placeholder
          header="Начните диалог"
          action={
            <Button
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

  return (
    <div className={classes.messagesContainer}>
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isDisabled={messages.length - 1 === index && isTyping}
        />
      ))}
    </div>
  );
}

export default memo(MessengerList);
