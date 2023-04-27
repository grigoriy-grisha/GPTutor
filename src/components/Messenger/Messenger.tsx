import React, { memo, useEffect } from "react";
import { Header } from "./Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import { MessengerWriteBar } from "./MessengerWriteBar";
import { AppContainer } from "../AppContainer";
import { LessonItem } from "../../entity/lessons/LessonItem";
import { ChatGpt } from "../../entity/GPT/ChatGpt";
import { useMessengerScroll } from "./hooks/useMessengerScroll";

interface IProps {
  goBack: () => void;
  lesson: LessonItem | null;
  chatGpt: ChatGpt;
  onSettingsClick: () => void;
}

function Messenger({ goBack, lesson, chatGpt, onSettingsClick }: IProps) {
  const isTyping = chatGpt.sendCompletions$.loading.get();

  const { scrollRef, scrollToBottom } = useMessengerScroll(isTyping);

  const onStartChat = () => {
    const initialRequest = lesson?.initialRequest;
    if (initialRequest) initialRequest.select();

    chatGpt.send(initialRequest?.text || "Привет, что ты можешь?");
  };

  const handlerSend = (message: string) => {
    if (!message) return;
    chatGpt.send(message);
    setTimeout(scrollToBottom, 50);
  };

  useEffect(() => () => chatGpt.abortSend(), [chatGpt]);

  return (
    <AppContainer
      maxHeight
      headerChildren={<Header goBack={goBack} isTyping={isTyping} />}
      style={{ flexDirection: "column-reverse" }}
    >
      {() => (
        <>
          <MessengerContainer withoutDiv ref={scrollRef}>
            <MessengerList
              chatGpt={chatGpt}
              isTyping={isTyping}
              onStartChat={onStartChat}
            />
          </MessengerContainer>
          <MessengerWriteBar
            onSettingsClick={onSettingsClick}
            chatGpt={chatGpt}
            additionalRequests={lesson?.additionalRequests || []}
            handleSend={handlerSend}
            isTyping={isTyping}
          />
        </>
      )}
    </AppContainer>
  );
}

export default memo(Messenger);
