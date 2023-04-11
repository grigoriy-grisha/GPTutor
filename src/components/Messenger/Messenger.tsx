import React, { memo, useEffect, useRef } from "react";
import { Header } from "./Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import { MessengerWriteBar } from "./MessengerWriteBar";
import { useSubscribe } from "../../hooks";
import { AppContainer } from "../AppContainer";
import { LessonItem } from "../../entity/lessons/LessonItem";
import { ChatGpt } from "../../entity/GPT/ChatGpt";

interface IProps {
  goBack: () => void;
  user: any;
  lesson: LessonItem | null;
  chatGpt: ChatGpt;
}

function Messenger({ goBack, user, lesson, chatGpt }: IProps) {
  useSubscribe(chatGpt.isTyping$, chatGpt.messages$);

  const ref = useRef<HTMLDivElement>();

  const onStartChat = () => {
    chatGpt.send(lesson?.initialRequest?.text || "Привет, что ты можешь?");
  };

  const handlerSend = (message: string) => {
    chatGpt.send(message);

    setTimeout(() => {
      if (!ref.current) return;
      ref.current.scrollTop = ref.current?.scrollHeight;
    }, 50);
  };

  useEffect(() => () => chatGpt.abortSend(), [chatGpt]);

  return (
    <AppContainer
      maxHeight
      headerChildren={
        <Header goBack={goBack} isTyping={chatGpt.isTyping$.getValue()} />
      }
      style={{ flexDirection: "column-reverse" }}
    >
      {() => (
        <>
          <MessengerContainer ref={ref}>
            <MessengerList
              messages={chatGpt.messages$.getValue()}
              user={user}
              onStartChat={onStartChat}
            />
          </MessengerContainer>
          <MessengerWriteBar
            additionalRequests={lesson?.additionalRequests || []}
            handleSend={handlerSend}
            isTyping={chatGpt.isTyping$.getValue()}
          />
        </>
      )}
    </AppContainer>
  );
}

export default memo(Messenger);
