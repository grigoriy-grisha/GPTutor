import React, { useMemo } from "react";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "../../components/Messenger";
import { lessonsController } from "../../entity/lessons";
import { ChatGpt } from "../../entity/GPT/ChatGpt";
import { GptMessage } from "../../entity/GPT/GptMessage";
import { GPTRoles } from "../../entity/GPT/types";

interface IProps {
  id: string;
  goBack: () => void;
}

const systemMessage = new GptMessage(
  "Ты программист с опытом веб разработки в 10 лет, отвечаешь на вопросы джуниора, который хочет научиться программированию, добавляй правильную подсветку кода, указывай язык для блоков кода",
  GPTRoles.system
);

const Chat = ({ id, goBack }: IProps) => {
  const currentLesson = lessonsController.currentLesson?.get();

  const chatGpt = useMemo(() => new ChatGpt(systemMessage), []);

  return (
    <Panel id={id}>
      <Messenger
        chatGpt={chatGpt}
        goBack={goBack}
        lesson={currentLesson}
      />
    </Panel>
  );
};

export default Chat;
