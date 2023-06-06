import React, { memo } from "react";

import { IconButton, Separator, Text } from "@vkontakte/vkui";
import { Icon28Cancel } from "@vkontakte/icons";

import { Copy } from "$/components/Copy";

import classes from "./SelectedMessagesBar.module.css";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

interface IProps {
  chatGpt: ChatGptTemplate;
}

export function SelectedMessagesBar({ chatGpt }: IProps) {
  const selectedMessages = chatGpt.selectedMessages$.get();

  const text = selectedMessages.reduce(
    (acc, message, index) =>
      acc + (index == 0 ? "" : "\n\n") + message.content$.get(),
    ""
  );

  return (
    <>
      <Separator wide />
      <div className={classes.container}>
        <div className={classes.info}>
          <Text weight="2">Выбрано сообщений {selectedMessages.length}</Text>

          <IconButton
            className={classes.cancel}
            onClick={chatGpt.clearSelectedMessages}
          >
            <Icon28Cancel />
          </IconButton>
        </div>

        <div className={classes.actions}>
          <Copy
            isButton
            textToClickBoard={text}
            onAfterClickBoard={chatGpt.clearSelectedMessages}
          />
        </div>
      </div>
    </>
  );
}

export default memo(SelectedMessagesBar);
