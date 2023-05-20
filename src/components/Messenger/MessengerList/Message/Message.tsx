import React, { memo } from "react";

import {
  classNames,
  Div,
  IconButton,
  Text,
  useAppearance,
} from "@vkontakte/vkui";
import {
  Icon24CheckCircleOutline,
  Icon24WarningTriangleOutline,
} from "@vkontakte/icons";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";

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
  const appearance = useAppearance();

  const runOutOfContextMessages = chatGpt.getRunOutOfContextMessages$.get();
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
      className={classNames(
        { [classes.message]: hasSelectedMessages },
        selected,
        disabled
      )}
      onClick={onClickMessage}
    >
      <Div className={classes.container}>
        <div className={classes.normalize}>
          <MessengerAva message={message} photo={vkUser?.photo_100} />
        </div>
        <div style={{ display: "grid", width: "100%" }}>
          <div className={classes.topBlock}>
            <Text weight="2" className={classes.normalize}>
              {message.role === "assistant"
                ? "GPTutor"
                : vkUser?.first_name || "Вы"}
            </Text>
            <div className={classes.iconsBlock}>
              {runOutOfContextMessages.find(({ id }) => message.id === id) && (
                <TextTooltip
                  appearance={appearance === "light" ? "accent" : "white"}
                  style={{ maxWidth: 250 }}
                  text="Из-за длинного размера сообщений ниже,
                   это сообщение не может быть учтено в локальном контексте.
                   Chat GPT может поддерживать только 3500 слов в текущем диалоге."
                >
                  <IconButton>
                    <Icon24WarningTriangleOutline />
                  </IconButton>
                </TextTooltip>
              )}
              <IconButton
                className={selected ? classes.selectedIcon : ""}
                onClick={onSelectFirstMessage}
              >
                <Icon24CheckCircleOutline />
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
