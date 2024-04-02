import React, { memo, useEffect } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { subscriptionsController } from "$/entity/subscriptions";

import { Header } from "./Header";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import { MessengerWriteBar } from "./MessengerWriteBar";
import { AppContainer } from "../AppContainer";

import { useMessenger } from "./hooks/useMessenger";
import ScrollDown from "./ScrollDown";

interface IProps {
  hideDeleteDialog?: boolean;
  goBack: () => void;
  chatGpt: ChatGptTemplate;

  onStartChat: () => void;

  writeBarBefore: React.ReactNode;

  additionalRequest: (
    handleSend: (value: string) => void,
    scrollToBottom: () => void
  ) => React.ReactNode;

  placeholderHeader?: string;
  startText?: string;
  startIsDisabled?: boolean;
  placeholderText?: string;
}

function Messenger({
  goBack,
  chatGpt,
  onStartChat,
  writeBarBefore,
  additionalRequest,
  placeholderHeader,
  startText,
  startIsDisabled,
  placeholderText,
  hideDeleteDialog,
}: IProps) {
  const { isTyping, scrollRef, showScrollDown, handlerSend, scrollToBottom } =
    useMessenger({ chatGpt });

  const isDisableSubscription = subscriptionsController.isDisable();

  useEffect(() => {
    if (!isDisableSubscription) {
      chatGpt.disableTimer();
    }
    return () => chatGpt.closeDelay();
  }, [isDisableSubscription]);

  return (
    <AppContainer
      withoutTabbar
      maxHeight
      headerChildren={<Header goBack={goBack} isTyping={isTyping} />}
      style={{ flexDirection: "column-reverse" }}
    >
      <MessengerContainer withoutDiv ref={scrollRef}>
        <MessengerList
          placeholderText={placeholderText}
          startIsDisabled={startIsDisabled}
          placeholderHeader={placeholderHeader}
          startText={startText}
          chatGpt={chatGpt}
          onStartChat={onStartChat}
        />
        <ScrollDown isShow={showScrollDown} onClick={scrollToBottom} />
      </MessengerContainer>
      <MessengerWriteBar
        hideDeleteDialog={hideDeleteDialog}
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
