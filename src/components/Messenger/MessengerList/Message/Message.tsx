import React, { memo } from "react";

import { Div, IconButton, Text } from "@vkontakte/vkui";
import { Icon28CheckCircleOutline } from "@vkontakte/icons";

import { ChatGpt, GptMessage } from "$/entity/GPT";

import { vkUser } from "$/entity/user";

import { MessengerParagraph } from "$/components/Messenger/MessengerParagraph";
import { MessengerAva } from "$/components/Messenger/MessengerAva";

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

  const onClickMessage = () => {
    if (isDisabled || !hasSelectedMessages) return;
    message.toggleSelected();
  };

  const onSelectFirstMessage = (e: any) => {
    e.stopPropagation();
    !isDisabled && message.toggleSelected();
  };

  return (
    <div
      className={`${
        hasSelectedMessages ? classes.message : ""
      } ${selected} ${disabled}`}
      onClick={onClickMessage}
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
              <IconButton onClick={onSelectFirstMessage}>
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
