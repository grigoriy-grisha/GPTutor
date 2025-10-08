import React, { useState, useRef, useEffect, useCallback } from "react";
import { Panel, NavIdProps, ScrollArrow } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { userViewModel } from "../../viewModels/UserViewModel";
import { chatViewModel } from "./models";
import { ChatHeader, MessageList, ChatInput } from "./components";
import {
  useMessengerScroll,
  useChatHandlers,
  useChatNavigation,
} from "./hooks";
import {
  chatContainerStyle,
  messagesScrollContainerStyle,
  messagesInnerContainerStyle,
  scrollArrowContainerStyle,
} from "./styles";

export interface ChatProps extends NavIdProps {}

/**
 * Главная панель чата
 */
export const Chat: React.FC<ChatProps> = observer(({ id }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Хуки
  const { scrollRef, scrollToBottom, showScrollDown } = useMessengerScroll(
    chatViewModel.isTyping
  );
  const { handleBack, handleModelSelect } = useChatNavigation();
  const { handleSendMessage, handleStartChat, handleCopyMessage } =
    useChatHandlers({
      scrollToBottom,
      onMessageChange: setMessage,
    });

  // Инициализация пользователя
  useEffect(() => {
    userViewModel.getUser();
  }, []);

  // Получение имени пользователя
  const getUserName = useCallback(() => {
    return userViewModel.user?.first_name || "Вы";
  }, [userViewModel.user?.first_name]);

  // Очистка сообщений
  const handleClearMessages = useCallback(() => {
    chatViewModel.clearMessages();
  }, []);

  return (
    <Panel id={id}>
      <div className="chat-container" style={chatContainerStyle}>
        <ChatHeader
          isTyping={chatViewModel.isTyping}
          onBack={handleBack}
          currentModel={chatViewModel.currentModel}
        />

        <div ref={scrollRef} style={messagesScrollContainerStyle}>
          <div style={messagesInnerContainerStyle}>
            <MessageList
              ref={messagesEndRef}
              messages={chatViewModel.getMessages()}
              userViewModel={userViewModel}
              getUserName={getUserName}
              onCopyMessage={handleCopyMessage}
              onStartChat={handleStartChat}
            />
          </div>
        </div>

        <div style={scrollArrowContainerStyle}>
          {showScrollDown && (
            <ScrollArrow direction="down" onClick={scrollToBottom} />
          )}
        </div>

        <ChatInput
          message={message}
          onMessageChange={setMessage}
          onSendMessage={() => handleSendMessage(message)}
          disabled={chatViewModel.isLoading}
          currentModel={chatViewModel.currentModel}
          onModelSelect={handleModelSelect}
          onClearMessages={handleClearMessages}
        />
      </div>
    </Panel>
  );
});
