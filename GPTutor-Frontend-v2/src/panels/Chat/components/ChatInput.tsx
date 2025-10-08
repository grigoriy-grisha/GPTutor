import React from "react";
import {
  WriteBar,
  WriteBarIcon,
  Separator,
  Button,
  Div,
  Flex,
} from "@vkontakte/vkui";
import { Icon28Send, Icon28SettingsOutline, Icon24DeleteOutline } from "@vkontakte/icons";
import { observer } from "mobx-react-lite";
import { ChatInputProps } from "../types";

export const ChatInput: React.FC<ChatInputProps> = observer(
  ({
    message,
    onMessageChange,
    onSendMessage,
    disabled = false,
    currentModel,
    onModelSelect,
    onClearMessages,
  }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSendMessage();
      }
    };

    return (
      <div
        style={{
          width: "100%",
          background: "var(--vkui--color_background)",
        }}
      >
        <Div
          style={{
            background: "var(--vkui--color_background_contrast_themed)",
            borderTop: "1px solid var(--vkui--color_separator_primary)",
          }}
        >
          <Flex gap={8}>
            <Button
              size="s"
              mode="outline"
              onClick={onModelSelect}
              disabled={disabled}
              before={<Icon28SettingsOutline width={16} height={16} />}
            >
              {currentModel}
            </Button>
          </Flex>
        </Div>

        <Separator />
        <WriteBar
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          after={
            <>
              <WriteBarIcon
                onClick={onClearMessages}
                disabled={disabled}
                style={{ color: "var(--vkui--color_icon_negative)" }}
              >
                <Icon24DeleteOutline />
              </WriteBarIcon>
              <WriteBarIcon
                mode="send"
                onClick={onSendMessage}
                disabled={!message.trim() || disabled}
              >
                <Icon28Send />
              </WriteBarIcon>
            </>
          }
          placeholder="Сообщение"
        />
      </div>
    );
  }
);
