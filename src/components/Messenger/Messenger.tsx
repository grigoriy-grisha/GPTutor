import React, { memo } from "react";

import { LessonItem } from "$/entity/lessons/LessonItem";
import { ChatGpt } from "$/entity/GPT/ChatGpt";

import { Header } from "./Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import { MessengerWriteBar } from "./MessengerWriteBar";
import { AppContainer } from "../AppContainer";

import { useMessenger } from "./hooks/useMessenger";

interface IProps {
  goBack: () => void;
  lesson: LessonItem | null;
  chatGpt: ChatGpt;
  onSettingsClick: () => void;
}

function Messenger({ goBack, lesson, chatGpt, onSettingsClick }: IProps) {
  const { isTyping, scrollRef, onStartChat, handlerSend } = useMessenger({
    chatGpt,
    lesson,
  });

  return (
    <AppContainer
      maxHeight
      headerChildren={<Header goBack={goBack} isTyping={isTyping} />}
      style={{ flexDirection: "column-reverse" }}
    >
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
    </AppContainer>
  );
}

export default memo(Messenger);
