import React, { useEffect } from "react";
import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import { interviews } from "$/entity/interview";
import { ChatInterviewAdditionalRequests } from "./ChatInterviewAdditionalRequests";
import { ChatInterviewWriteBarBefore } from "./ChatInterviewWriteBarBefore";

interface IProps {
  id: string;
}

function ChatInterview({ id }: IProps) {
  const { goBack, openInterviewQuestions } = useNavigationContext();

  const onStartChat = async () => {
    await chatGpt.chatGptInterview.sendQuestion(
      interviews.getCurrentInterview().getCurrentQuestion().question
    );
  };

  const onClickList = () => {
    openInterviewQuestions();
  };

  useEffect(() => {
    return () => chatGpt.chatGptInterview.abortSend();
  }, []);

  return (
    <Panel id={id}>
      <Messenger
        startText="Начать собеседование"
        writeBarBefore={
          <ChatInterviewWriteBarBefore onClickList={onClickList} />
        }
        additionalRequest={(handleSend, scrollToBottom) => (
          <ChatInterviewAdditionalRequests
            scrollToBottom={scrollToBottom}
            interviews={interviews}
          />
        )}
        onStartChat={onStartChat}
        chatGpt={chatGpt.chatGptInterview}
        goBack={goBack}
      />
    </Panel>
  );
}

export default ChatInterview;
