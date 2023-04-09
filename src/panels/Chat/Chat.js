import React, { useMemo } from "react";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "../../components/Messenger";
import { useSubscribe } from "../../hooks";
import { lessonsController } from "../../entity/lessons";
import { ChatGpt } from "../../entity/GPT/ChatGpt";

const Chat = ({ id, user, goBack }) => {
  useSubscribe(lessonsController.currentLesson$);

  const currentLesson = lessonsController.currentLesson$?.getValue();

  const chatGpt = useMemo(() => new ChatGpt(), []);

  return (
    <Panel id={id}>
      <Messenger
        chatGpt={chatGpt}
        goBack={() => {
          lessonsController.clearLesson();
          goBack();
        }}
        user={user}
        lesson={currentLesson}
      />
    </Panel>
  );
};

export default Chat;
