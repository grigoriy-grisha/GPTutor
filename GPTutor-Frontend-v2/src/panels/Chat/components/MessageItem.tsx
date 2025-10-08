import React, { useMemo } from "react";
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
import { FileDisplay } from "./FileDisplay";
import { CitationLink } from "../../../components/CitationLink";
import {
  formatTextWithCitations,
  getDomainFromUrl,
} from "../../../utils/citationFormatter";
import { observer } from "mobx-react-lite";

const markdown = new Markdown();

export const MessageItem: React.FC<MessageItemProps> = observer(
  ({ message, userViewModel, getUserName, onCopyMessage }) => {
    const containerRef = useCodeCopyButtons(message.isTyping);

    // Форматируем контент с цитированиями
    const formattedContent = useMemo(() => {
      const renderedMarkdown = markdown.render(message.content);

      if (message.citations && message.citations.length > 0) {
        console.log("Formatting content with citations:", {
          citationsCount: message.citations.length,
          citations: message.citations,
          contentLength: message.content.length,
        });
        const formatted = formatTextWithCitations(
          renderedMarkdown,
          message.citations
        );
        console.log("Formatted content preview:", formatted.substring(0, 500));
        return formatted;
      }

      return renderedMarkdown;
    }, [message.content, message.citations]);

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
              {message.isAssistant && !message.content && !message.reasoning ? (
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
                  {/* Отображение прикрепленных файлов */}
                  {message.attachedFilesList &&
                    message.attachedFilesList.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "14px",
                        }}
                      >
                        {message.attachedFilesList.map((file) => (
                          <FileDisplay
                            key={file.id}
                            file={file}
                            showRemoveButton={false}
                          />
                        ))}
                      </div>
                    )}

                  {/* Блок reasoning если есть */}
                  {message.reasoning && (
                    <div
                      style={{
                        marginTop: "20px",
                        marginBottom: "12px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        background: "var(--vkui--color_background_secondary)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--vkui--color_accent_blue)",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        🧠 Reasoning
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "var(--vkui--color_text_secondary)",
                          fontStyle: "italic",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {message.reasoning}
                      </div>
                    </div>
                  )}

                  <div
                    ref={containerRef}
                    className="code-block"
                    style={{
                      fontSize: "15px",
                      lineHeight: "20px",
                      color: "var(--vkui--color_text_primary)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formattedContent,
                    }}
                  />

                  {/* Список цитирований */}
                  {message.citations && message.citations.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      {message.citations.map((url, index) => {
                        const domain = getDomainFromUrl(url);
                        return (
                          <CitationLink key={index} url={url} domain={domain} />
                        );
                      })}
                    </div>
                  )}

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
                        whiteSpace: "nowrap",
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
                        {message.usage.promptTokens} In
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Icon16ArrowUpOutline />
                        {message.usage.completionTokens} Out
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
