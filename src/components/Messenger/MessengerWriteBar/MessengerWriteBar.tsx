import React, { memo, useEffect, useRef, useState } from "react";

import {
  Button,
  Div,
  Platform,
  Separator,
  usePlatform,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import {
  Icon24KeyboardBotsOutline,
  Icon28KeyboardBotsOutline,
} from "@vkontakte/icons";

import { IconRenderer } from "../../IconRenderer";

import classes from "./MessengerWriteBar.module.css";
import WaitBanner from "./WaitBaner/WaitBaner";
import { LessonRequest } from "../../../entity/lessons/LessonRequest";

interface IProps {
  additionalRequests: LessonRequest[];
  handleSend: (message: string) => void;
  isTyping: boolean;
}

function MessengerWriteBar({
  additionalRequests,
  handleSend,
  isTyping,
}: IProps) {
  const [isAdditionalOpen, setAdditionalsOpen] = useState(true);
  const [value, setValue] = useState("");

  const valueRef = useRef("");
  valueRef.current = value;

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
      if (event.key !== "Enter") return;

      event.preventDefault();
      handleSend(valueRef.current);
      setValue("");
    };

    document.addEventListener("keypress", send);
    return () => document.removeEventListener("keypress", send);
  }, []);

  return (
    <div className={classes.container}>
      <WaitBanner />
      <div style={{ width: "100%" }}>
        {additionalRequests && isAdditionalOpen && (
          <>
            <Separator wide />
            <Div className={classes.additionalRequests}>
              {additionalRequests.map((request, index) => (
                <Button
                  aria-label={request.name}
                  key={index}
                  disabled={isTyping}
                  mode={request.isSelected ? "outline" : "primary"}
                  size="m"
                  onClick={() => {
                    handleSend(request.text);
                    request.select();
                  }}
                >
                  {request.name}
                </Button>
              ))}
            </Div>
          </>
        )}
        <Separator wide />
        <WriteBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          before={
            <>
              {additionalRequests && (
                <WriteBarIcon
                  aria-label="Открыть меню"
                  onClick={() => setAdditionalsOpen(!isAdditionalOpen)}
                >
                  {KeyboardBotsOutlineIcon}
                </WriteBarIcon>
              )}
            </>
          }
          after={
            <>
              <WriteBarIcon
                mode="send"
                aria-label="Отправить сообщение"
                disabled={value.length === 0 || isTyping}
                onClick={() => {
                  handleSend(value);
                  setValue("");
                }}
              />
            </>
          }
          placeholder="Сообщение"
        />
      </div>
    </div>
  );
}

export default memo(MessengerWriteBar);
