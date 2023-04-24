import React, { memo } from "react";

import { Div, IconButton, Text } from "@vkontakte/vkui";
import { Icon28CheckCircleOutline } from "@vkontakte/icons";

import { ChatGpt } from "$entity/GPT/ChatGpt";

import { MessengerAva } from "../../MessengerAva";
import { vkUser } from "../../../../entity/user";
import { GptMessage } from "../../../../entity/GPT/GptMessage";
import { MessengerParagraph } from "../../MessengerParagraph";

import classes from "./Message.module.css";

interface IProps {
  chatGpt: ChatGpt;
  isDisabled: boolean;
  message: GptMessage;
}

function Message({ chatGpt, message, isDisabled }: IProps) {
  const selected = message.isSelected$.get() ? classes.selected : "";
  const disabled = isDisabled ? classes.disabled : "";

  const hasSelectedMessages = chatGpt.hasSelectedMessages$.get();

  return (
    <div
      className={`${
        hasSelectedMessages ? classes.message : ""
      } ${selected} ${disabled}`}
      onClick={() =>
        !isDisabled && hasSelectedMessages && message.toggleSelected()
      }
    >
      <Div className={classes.container}>
        <div className={classes.normalize}>
          <MessengerAva message={message} photo={vkUser?.photo_100} />
        </div>

        <div style={{ display: "grid", width: "100%" }}>
          <div className={classes.topBlock}>
            <Text weight="2" className={classes.normalize}>
              {message.role === "assistant" ? "Chat GPT" : vkUser?.first_name}
            </Text>
            <div
              className={`${classes.iconsBlock} ${
                selected ? classes.selectedIcon : ""
              }`}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  !isDisabled && message.toggleSelected();
                }}
              >
                <Icon28CheckCircleOutline />
              </IconButton>
            </div>
          </div>

          <MessengerParagraph message={message} />
        </div>
      </Div>
    </div>
  );
}

export default memo(Message);
