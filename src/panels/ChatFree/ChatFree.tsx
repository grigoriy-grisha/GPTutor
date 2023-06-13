import React from "react";
import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";

import { ChatFreeWriteBarBefore } from "./ChatFreeWriteBarBefore";
import { ChatFreeAdditionalRequests } from "./ChatFreeAdditionalRequests";

interface IProps {
  id: string;
}

function ChatFree({ id }: IProps) {
  const { goBack, openChatSettingsModal } = useNavigationContext();

  const onStartChat = () => {
    chatGpt.chatGptFree.send("Привет, что ты можешь?");
  };

  return (
    <Panel id={id}>
      <Messenger
        writeBarBefore={
          <ChatFreeWriteBarBefore onSettingsClick={openChatSettingsModal} />
        }
        additionalRequest={(handleSend) => (
          <ChatFreeAdditionalRequests handleSend={handleSend} />
        )}
        onStartChat={onStartChat}
        chatGpt={chatGpt.chatGptFree}
        goBack={goBack}
      />
    </Panel>
  );
}

export default ChatFree;
