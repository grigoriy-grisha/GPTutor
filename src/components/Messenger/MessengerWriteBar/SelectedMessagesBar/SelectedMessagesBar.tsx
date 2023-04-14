import React, { memo } from "react";
import { IconButton, Separator, Text } from "@vkontakte/vkui";
import { Icon28Cancel } from "@vkontakte/icons";

import { ChatGpt } from "../../../../entity/GPT/ChatGpt";
import { Copy } from "../../../Copy";

import classes from "./SelectedMessagesBar.module.css";

interface IProps {
  children: React.ReactNode;
  chatGpt: ChatGpt;
}

export function SelectedMessagesBar({ chatGpt, children }: IProps) {
  const selectedMessages = chatGpt.selectedMessages$.get();

  if (selectedMessages.length === 0) return <>{children}</>;

  const text = selectedMessages.reduce(
    (acc, message) => acc + "\n" + message.content$.get(),
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