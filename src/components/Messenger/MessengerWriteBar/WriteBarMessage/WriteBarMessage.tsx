import React, { memo, useEffect, useRef, useState } from "react";
import {
  Platform,
  Separator,
  usePlatform,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import { IconRenderer } from "../../../IconRenderer";
import {
  Icon24KeyboardBotsOutline,
  Icon28CancelCircleOutline,
  Icon28DeleteOutline,
  Icon28KeyboardBotsOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";
import { LessonRequest } from "../../../../entity/lessons/LessonRequest";

interface IProps {
  isTyping: boolean;
  abortSend: () => void;
  handleSend: (value: string) => void;
  additionalRequests: LessonRequest[];
  onClickAdditional: () => void;
  clearMessages: () => void;
}

function WriteBarMessage({
  abortSend,
  handleSend,
  additionalRequests,
  isTyping,
  onClickAdditional,
  clearMessages,
}: IProps) {
  const [value, setValue] = useState("");

  const valueRef = useRef("");
  const isTypingRef = useRef(isTyping);
  valueRef.current = value;
  isTypingRef.current = isTyping;

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

  useEffect(() => {
    const send = (event: KeyboardEvent) => {
      if (isTypingRef.current) return;
      if (event.key !== "Enter") return;

      event.preventDefault();
      handleSend(valueRef.current);
      setValue("");
    };

    document.addEventListener("keypress", send);
    return () => document.removeEventListener("keypress", send);
  }, []);

  return (
    <>
      <Separator wide />
      <WriteBar
        value={value}
        onChange={(e) => setValue(e.target.value)}
        before={
          <>
            {!additionalRequests?.length && (
              <WriteBarIcon>
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
