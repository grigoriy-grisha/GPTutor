import { Button, Placeholder, Text } from "@vkontakte/vkui";
import React, { memo } from "react";

import { MessengerParagraph } from "../MessengerParagraph";
import { MessengerAva } from "../MessengerAva";

import classes from "./MessengerList.module.css";
import { GptMessage } from "../../../entity/GPT/GptMessage";
import { vkUser } from "../../../entity/user";

interface IProps {
  messages: GptMessage[];
  user: any;
  onStartChat: () => void;
}

function MessengerList({ messages, onStartChat }: IProps) {
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
    <>
      {messages.map((message, index) => (
        <div className={classes.container} key={index}>
          <MessengerAva message={message} photo={vkUser?.photo_100} />
          <div style={{ display: "grid", width: "100%" }}>
            <Text weight="2">
              {message.role === "assistant" ? "Chat GPT" : vkUser?.first_name}
            </Text>
            <MessengerParagraph message={message} />
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(MessengerList);
