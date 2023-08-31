import React, { useCallback, useEffect, useState } from "react";
import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import { lessonsController } from "$/entity/lessons";

import { ChatLessonWriteBarBefore } from "./ChatLessonWriteBarBefore";
import { ChatLessonAdditionalRequests } from "./ChatLessonAdditionalRequests";

interface IProps {
  id: string;
}

function ChatLesson({ id }: IProps) {
  const [isAdditionalOpen, setAdditionsOpen] = useState(true);

  const onClickAdditional = useCallback(
    () => setAdditionsOpen((prev) => !prev),
    []
  );

  const { goBack } = useNavigationContext();

  const currentLesson = lessonsController.currentLesson.get();

  const onStartChat = () => {
    const initialRequest = currentLesson?.initialRequest;
    if (initialRequest) initialRequest.select();

    chatGpt.chatGptLesson.send(initialRequest?.text || "");
  };

  const additionalRequests = currentLesson?.additionalRequests || [];
  const isStopped = chatGpt.chatGptLesson.timer.isStopped$.get();
  const isTyping = chatGpt.chatGptLesson.sendCompletions$.loading.get();
  const isBlockActions = chatGpt.chatGptLesson.isBlockActions$.get();

  useEffect(() => {
    return () => chatGpt.chatGptLesson.abortSend();
  }, []);

  return (
    <Panel id={id}>
      <Messenger
        writeBarBefore={
          <ChatLessonWriteBarBefore
            additionalRequests={additionalRequests}
            onClickAdditional={onClickAdditional}
          />
        }
        additionalRequest={(handleSend) => (
          <ChatLessonAdditionalRequests
            isStopped={isStopped}
            additionalRequests={additionalRequests}
            isAdditionalOpen={isAdditionalOpen}
            handleSend={handleSend}
            isTyping={isTyping || isBlockActions}
          />
        )}
        onStartChat={onStartChat}
        chatGpt={chatGpt.chatGptLesson}
        goBack={goBack}
      />
    </Panel>
  );
}

export default ChatLesson;
