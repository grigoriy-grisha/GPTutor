import React from "react";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

const Chat = ({ id }: IProps) => {
  const { goBack, goToHistory, goToChatSettings } = useNavigationContext();

  const currentLesson = lessonsController.currentLesson.get();

  return (
    <Panel id={id}>
      <Messenger
        chatGpt={chatGpt}
        onSettingsClick={goToChatSettings}
        goBack={goBack}
        goToHistory={goToHistory}
        lesson={currentLesson}
      />
    </Panel>
  );
};

export default Chat;
