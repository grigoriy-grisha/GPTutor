import React from "react";
import { Avatar, Text, IconButton, Skeleton } from "@vkontakte/vkui";
import {
  Icon28MessageOutline,
  Icon28UserCircleOutline,
  Icon16CopyOutline,
  Icon16ArrowDownOutline,
  Icon16ArrowUpOutline,
  Icon24MoneyCircleOutline,
} from "@vkontakte/icons";
import { MessageItemProps } from "../types";
import Markdown from "../../../services/Markdown";
import { useCodeCopyButtons } from "../../../hooks/useCodeCopyButtons.tsx";
import { observer } from "mobx-react-lite";

const markdown = new Markdown();

export const MessageItem: React.FC<MessageItemProps> = observer(
  ({ message, userViewModel, getUserName, onCopyMessage }) => {
    const containerRef = useCodeCopyButtons(message.isTyping);

    return (
      <div
        style={{
          position: "relative",
          paddingBottom: "2px",
          paddingTop: "2px",
          marginTop: "2px",
          marginBottom: "2px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <IconButton
          size={20}
          onClick={() => onCopyMessage(message.content)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            opacity: 0.6,
            zIndex: 1,
          }}
        >
          <Icon16CopyOutline />
        </IconButton>

        <div
          style={{
            display: "flex",
            paddingRight: "32px",
          }}
        >
          <div
            style={{
              position: "relative",
              top: "6px",
              marginRight: "12px",
            }}
          >
            <Avatar
              size={32}
              src={
                message.isUser && userViewModel.user?.photo_200
                  ? userViewModel.user.photo_200
                  : message.isAssistant
                  ? "https://storage.yandexcloud.net/giga-router/aphex-twin.png"
                  : undefined
              }
              fallbackIcon={
                message.isAssistant ? (
                  <Icon28MessageOutline />
                ) : (
                  <Icon28UserCircleOutline />
                )
              }
              style={{
                backgroundColor: message.isAssistant
                  ? "var(--vkui--color_icon_secondary)"
                  : "var(--vkui--color_accent_blue)",
              }}
            />
          </div>

          <div style={{ display: "grid", width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text
                weight="3"
                style={{
                  position: "relative",
                  top: "6px",
                  fontSize: "15px",
                }}
              >
                {message.isAssistant ? "Giga Router" : getUserName()}
              </Text>
            </div>

            <div
              style={{
                marginBottom: "4px",
              }}
            >
              {message.isAssistant && !message.content ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: 14,
                  }}
                >
                  <Skeleton width="90%" height={16} />
                  <Skeleton width="75%" height={16} />
                  <Skeleton width="60%" height={16} />
                </div>
              ) : (
                <>
                  <div
                    ref={containerRef}
                    className="code-block"
                    style={{
                      fontSize: "15px",
                      lineHeight: "20px",
                      color: "var(--vkui--color_text_primary)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: markdown.render(message.content),
                    }}
                  />
                  {message.isAssistant && message.usage && (
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        background: "var(--vkui--color_background_secondary)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "12px",
                        color: "var(--vkui--color_text_secondary)",
                        fontWeight: 600,
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Icon16ArrowDownOutline />
                        {message.usage.promptTokens} Tokens in
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Icon16ArrowUpOutline />
                        {message.usage.completionTokens} Tokens out
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Icon24MoneyCircleOutline width={16} height={16} />
                        {message.usage.cost.toFixed(4)} ₽
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
