import { Panel } from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";

import { Messenger } from "$/components/Messenger";
import { chatGpt } from "$/entity/GPT";
import React, { useEffect } from "react";
import { useNavigationContext } from "$/NavigationContext";
import { ChatLeetCodeWriteBarBefore } from "$/panels/ChatLeetCode/ChatLeetCodeWriteBarBefore";
import { leetCode } from "$/entity/leetCode/LeetCode";
import { ChatLeetCodeAdditionalRequests } from "$/panels/ChatLeetCode/ChatLeetCodeAdditionalRequests";
import { RoutingPages } from "$/entity/routing";

interface IProps {
  id: string;
}

function getPlaceHolder() {
  const currentContent = leetCode.currentProblem?.data.question.content;

  return {
    placeholderHeader: !currentContent ? "Условие задачи отсутствует" : "",
    placeholderText: !currentContent
      ? "Невозможно начать обсуждение задачи, Нет условия"
      : "",
    startIsDisabled: !currentContent,
  };
}
function ChatLeetCode({ id }: IProps) {
  const router = useRouter();
  const { goBack, goToProblemDetail } = useNavigationContext();

  useEffect(() => {
    const currentContent = leetCode.currentProblem?.data.question.content;

    chatGpt.chatGptLeetCode.initSystemMessage();
    chatGpt.chatGptLeetCode.isBlockActions$.set(!currentContent);
  }, []);

  useEffect(() => {
    return router.onLeavePage(
      RoutingPages.chatLeetCode,
      (newRoute, oldRoute, isNewRoute, type) => {
        if (type === "PUSH") return;

        chatGpt.chatGptLeetCode.abortSend();
      }
    );
  }, []);

  return (
    <Panel id={id}>
      <Messenger
        {...getPlaceHolder()}
        writeBarBefore={
          <ChatLeetCodeWriteBarBefore onClick={goToProblemDetail} />
        }
        additionalRequest={(handleSend) => (
          <ChatLeetCodeAdditionalRequests handleSend={handleSend} />
        )}
        onStartChat={async () => {
          await chatGpt.chatGptLeetCode.send(
            "С чего начать, чтобы решить эту задачу?"
          );
        }}
        chatGpt={chatGpt.chatGptLeetCode}
        goBack={goBack}
      />
    </Panel>
  );
}

export default ChatLeetCode;
