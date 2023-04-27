import React from "react";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "../../components/Messenger";
import { lessonsController } from "../../entity/lessons";
import { chatGpt } from "../../entity/GPT/ChatGpt";

interface IProps {
  id: string;
  goBack: () => void;
  goToChatSettings: () => void;
}

const Chat = ({ id, goBack, goToChatSettings }: IProps) => {
  const currentLesson = lessonsController.currentLesson?.get();

  return (
    <Panel id={id}>
      <Messenger
        onSettingsClick={goToChatSettings}
        chatGpt={chatGpt}
        goBack={goBack}
        lesson={currentLesson}
      />
    </Panel>
  );
};

export default Chat;
