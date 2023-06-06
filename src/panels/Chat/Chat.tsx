import React, { useCallback, useState } from "react";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";

import WriteBarBefore from "$/components/Messenger/MessengerWriteBar/WriteBarMessage/WriteBarBefore/WriteBarBefore";
import { AdditionalRequests } from "$/components/Messenger/MessengerWriteBar/AdditionalRequests";

interface IProps {
  id: string;
}

const Chat = ({ id }: IProps) => {
  const [isAdditionalOpen, setAdditionsOpen] = useState(true);

  const onClickAdditional = useCallback(
    () => setAdditionsOpen((prev) => !prev),
    []
  );

  const { goBack, goToHistory, openChatSettingsModal } = useNavigationContext();

  const currentLesson = lessonsController.currentLesson.get();

  const onStartChat = () => {
    const initialRequest = currentLesson?.initialRequest;
    if (initialRequest) initialRequest.select();

    chatGpt
      .getCurrentChatGpt()
      .send(initialRequest?.text || "Привет, что ты можешь?");
  };

  const additionalRequests = currentLesson?.additionalRequests || [];

  const isStopped = chatGpt.getCurrentChatGpt().timer.isStopped$.get();

  const isTyping = chatGpt.getCurrentChatGpt().sendCompletions$.loading.get();

  const isBlockActions = chatGpt.getCurrentChatGpt().isBlockActions$.get();

  return (
    <Panel id={id}>
      <Messenger
        writeBarBefore={
          <WriteBarBefore
            additionalRequests={additionalRequests}
            onClickAdditional={onClickAdditional}
            onSettingsClick={openChatSettingsModal}
          />
        }
        additionalRequest={(handleSend) => (
          <AdditionalRequests
            isStopped={isStopped}
            additionalRequests={additionalRequests}
            isAdditionalOpen={isAdditionalOpen}
            handleSend={handleSend}
            isTyping={isTyping || isBlockActions}
          />
        )}
        onStartChat={onStartChat}
        chatGpt={chatGpt.getCurrentChatGpt()}
        onSettingsClick={openChatSettingsModal}
        goBack={goBack}
        goToHistory={goToHistory}
      />
    </Panel>
  );
};

export default Chat;
