import React, { memo } from "react";

import { Div, Text } from "@vkontakte/vkui";

import { MessengerAva } from "../../MessengerAva";
import { vkUser } from "../../../../entity/user";
import { GptMessage } from "../../../../entity/GPT/GptMessage";
import { MessengerParagraph } from "../../MessengerParagraph";

import classes from "./Message.module.css";

interface IProps {
  isDisabled: boolean;
  message: GptMessage;
}

function Message({ message, isDisabled }: IProps) {
  const selected = message.isSelected$.get() ? classes.selected : "";
  const disabled = isDisabled ? classes.disabled : "";

  return (
    <div
      className={`${classes.message} ${selected} ${disabled}`}
      onClick={() => {
        if (isDisabled) return;
        message.toggleSelected();
      }}
    >
      <Div className={classes.container}>
        <MessengerAva message={message} photo={vkUser?.photo_100} />
        <div style={{ display: "grid", width: "100%" }}>
          <Text weight="2">
            {message.role === "assistant" ? "Chat GPT" : vkUser?.first_name}
          </Text>
          <MessengerParagraph message={message} />
        </div>
      </Div>
    </div>
  );
}

export default memo(Message);
