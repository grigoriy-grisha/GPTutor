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
}

function Messenger({ goBack, lesson, chatGpt }: IProps) {
  const isTyping = chatGpt.sendCompletions$.loading.get();

  const { scrollRef, scrollToBottom } = useMessengerScroll(isTyping);

  const onStartChat = () => {
    chatGpt.send(lesson?.initialRequest?.text || "Привет, что ты можешь?");
  };

  const handlerSend = (message: string) => {
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
              isTyping={isTyping}
              messages={chatGpt.messages$.get()}
              onStartChat={onStartChat}
            />
          </MessengerContainer>
          <MessengerWriteBar
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
