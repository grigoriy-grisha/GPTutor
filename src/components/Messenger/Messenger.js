import React, { memo, useEffect, useRef, useState } from "react";
import Header from "./Header/Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import MessengerWriteBar from "./MessengerWriteBar/MessengerWriteBar";
import { useSubscribe } from "../../hooks";
import { AppContainer } from "../AppContainer";

function Messenger({ goBack, user, lesson, chatGpt }) {
  useSubscribe(chatGpt.isTyping$, chatGpt.messages$);

  const ref = useRef();

  const onStartChat = () => {
    chatGpt.send(lesson?.initialRequest?.text || "Привет, что ты можешь?");
  };

  const handlerSend = (message) => {
    chatGpt.send(message);

    setTimeout(() => {
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
            additionalRequests={lesson?.additionalRequests}
            handleSend={handlerSend}
            isTyping={chatGpt.isTyping$.getValue()}
          />
        </>
      )}
    </AppContainer>
  );
}

export default memo(Messenger);
