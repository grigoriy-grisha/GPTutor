import React, { memo, useRef, useState } from "react";
import {
  Platform,
  Separator,
  usePlatform,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import {
  Icon24KeyboardBotsOutline,
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
  Icon28KeyboardBotsOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";

import { IconRenderer } from "$/components/IconRenderer";
import { LessonRequest } from "$/entity/lessons/LessonRequest";
import { useWrite } from "$/components/Messenger/MessengerWriteBar/WriteBarMessage/hooks/useWrite";

interface IProps {
  isTyping: boolean;
  abortSend: () => void;
  handleSend: (value: string) => void;
  additionalRequests: LessonRequest[];
  onClickAdditional: () => void;
  clearMessages: () => void;
  onSettingsClick: () => void;
}

//todo Рефакториншг
function WriteBarMessage({
  abortSend,
  handleSend,
  additionalRequests,
  isTyping,
  onClickAdditional,
  clearMessages,
  onSettingsClick,
}: IProps) {
  const { setValue, value, onEnterSend } = useWrite({ isTyping, handleSend });
  const platform = usePlatform();

  const KeyboardBotsOutlineIcon = (
    <IconRenderer
      IconCompact={
        platform === Platform.IOS
          ? Icon28KeyboardBotsOutline
          : Icon24KeyboardBotsOutline
      }
      IconRegular={Icon28KeyboardBotsOutline}
    />
  );

  return (
    <>
      <Separator wide />
      <WriteBar
        onKeyDown={onEnterSend}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        before={
          <>
            {!additionalRequests?.length && (
              <WriteBarIcon onClick={onSettingsClick}>
                <Icon28SettingsOutline />
              </WriteBarIcon>
            )}
            {!!additionalRequests?.length && (
              <WriteBarIcon
                aria-label="Открыть меню"
                onClick={onClickAdditional}
              >
                {KeyboardBotsOutlineIcon}
              </WriteBarIcon>
            )}
          </>
        }
        after={
          <>
            <WriteBarIcon onClick={clearMessages}>
              <Icon28DeleteOutline />
            </WriteBarIcon>
            {!isTyping ? (
              <WriteBarIcon
                mode="send"
                aria-label="Отправить сообщение"
                disabled={value.length === 0 || isTyping}
                onClick={() => {
                  //todo вынести
                  handleSend(value);
                  setValue("");
                }}
              />
            ) : (
              <WriteBarIcon onClick={abortSend}>
                <Icon28CancelCircleOutline
                  fill="var(--vkui--color_icon_accent)"
                  width={28}
                  height={28}
                />
              </WriteBarIcon>
            )}
          </>
        }
        placeholder="Сообщение"
      />
    </>
  );
}

export default memo(WriteBarMessage);
