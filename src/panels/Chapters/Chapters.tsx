import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";

import Lessons from "./Lessons";

import classes from "./Chapters.module.css";

interface IProps {
  id: string;
  goToChat: () => void;
  goBack: () => void;
}

function Chapters({ id, goToChat, goBack }: IProps) {
  const currentChapter = lessonsController.currentChapter.get();

  return (
    <Panel id={id}>
      <div className={classes.panel}>
        <PanelHeader shadow before={<PanelHeaderBack onClick={goBack} />}>
          Диалоги
        </PanelHeader>
        {currentChapter && (
          <Lessons
            currentChapter={currentChapter}
            onClickLesson={(lesson) => {
              chatGpt.clearMessages();
              chatGpt.clearSystemMessage();
              lessonsController.setCurrentLesson(lesson.id);
              goToChat();
            }}
          />
        )}
      </div>
    </Panel>
  );
}

export default Chapters;
