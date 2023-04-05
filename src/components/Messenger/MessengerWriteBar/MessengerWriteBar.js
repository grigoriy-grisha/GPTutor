import React, { memo, useState } from "react";

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

function MessengerWriteBar({ additionalRequests, handleSend, isTyping }) {
  const [isAdditionalOpen, setAdditionalsOpen] = useState(true);
  const [value, setValue] = useState("");

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        flexShrink: "0",
      }}
    >
      <div style={{ width: "100%" }}>
        {additionalRequests && isAdditionalOpen && (
          <>
            <Separator wide />
            <Div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                background: "var(--vkui--color_background_content)",
              }}
            >
              {additionalRequests.map((request) => (
                <Button
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
