import React from "react";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";

interface IProps {
  id: string;
  goBack: () => void;
  goToChatSettings: () => void;
  goToHistory: () => void;
}

const Chat = ({ id, goBack, goToHistory, goToChatSettings }: IProps) => {
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
