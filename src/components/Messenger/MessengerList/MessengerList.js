import { Button, Placeholder, Text } from "@vkontakte/vkui";
import React, { memo } from "react";

import { MessengerParagraph } from "../MessengerParagraph";
import { MessengerAva } from "../MessengerAva";

import classes from "./MessengerList.module.css";

function MessengerList({ messages, user, onStartChat }) {
  if (messages.length === 0) {
    return (
      <Placeholder
        style={{ paddingTop: "40%" }}
        header="Начните диалог"
        action={
          <Button mode="outline" size="m" onClick={onStartChat}>
            Начать
          </Button>
        }
      >
        Спросите, на что способен бот
      </Placeholder>
    );
  }
  return (
    <>
      {messages.map((message) => {
        return (
          <div className={classes.container}>
            <MessengerAva message={message} photo={user?.photo_100} />
            <div style={{ display: "grid" }}>
              <Text weight="2">
                {message.sender === "ChatGPT" ? "Чат ГПТ" : user?.first_name}
              </Text>
              <MessengerParagraph message={message} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default memo(MessengerList);
