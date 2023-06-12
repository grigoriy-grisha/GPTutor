import React, { memo } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

import { Header } from "./Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import { MessengerWriteBar } from "./MessengerWriteBar";
import { AppContainer } from "../AppContainer";

import { useMessenger } from "./hooks/useMessenger";
import ScrollDown from "./ScrollDown";

interface IProps {
  goBack: () => void;
  chatGpt: ChatGptTemplate;

  onStartChat: () => void;

  writeBarBefore: React.ReactNode;

  additionalRequest: (
    handleSend: (value: string) => void,
    scrollToBottom: () => void
  ) => React.ReactNode;
}

function Messenger({
  goBack,
  chatGpt,
  onStartChat,
  writeBarBefore,
  additionalRequest,
}: IProps) {
  const { isTyping, scrollRef, showScrollDown, handlerSend, scrollToBottom } =
    useMessenger({ chatGpt });

  return (
    <AppContainer
      withoutTabbar
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
        <ScrollDown isShow={showScrollDown} onClick={scrollToBottom} />
      </MessengerContainer>
      <MessengerWriteBar
        additionalRequest={additionalRequest}
        scrollToBottom={scrollToBottom}
        writeBarBefore={writeBarBefore}
        chatGpt={chatGpt}
        handleSend={handlerSend}
        isTyping={isTyping}
      />
    </AppContainer>
  );
}

export default memo(Messenger);
