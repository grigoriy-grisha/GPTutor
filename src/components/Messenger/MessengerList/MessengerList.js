import { Button, Placeholder, Text } from "@vkontakte/vkui";
import React, { memo } from "react";

import { MessengerParagraph } from "../MessengerParagraph";
import { MessengerAva } from "../MessengerAva";

import classes from "./MessengerList.module.css";

function MessengerList({ messages, user, onStartChat }) {
  if (messages.length === 0) {
    return (
      <div className={classes.placeholderContainer}>
        <Placeholder
          header="Начните диалог"
          action={
            <Button mode="outline" size="m" onClick={onStartChat}>
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
          <MessengerAva message={message} photo={user?.photo_100} />
          <div style={{ display: "grid" }}>
            <Text weight="2">
              {message.role === "assistant" ? "Chat GPT" : user?.first_name}
            </Text>
            <MessengerParagraph message={message} />
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(MessengerList);
