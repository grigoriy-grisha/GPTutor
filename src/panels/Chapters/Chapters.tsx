import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { ChapterTypes, lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import PanelTitle from "$/components/PanelTitle";

import Lessons from "./Lessons";

import classes from "./Chapters.module.css";

interface IProps {
  id: string;
  goToChat: () => void;
  goBack: () => void;
}

const chapterTitles: Record<ChapterTypes, string> = {
  [ChapterTypes.React]: "Темы React",
  [ChapterTypes.Typescript]: "Темы Typescript",
  [ChapterTypes.HTMLCSS]: "Темы HTML и CSS",
  [ChapterTypes.Git]: "Темы Git",
  [ChapterTypes.JS]: "Темы JavaScript",
  [ChapterTypes.Vue]: "Темы Vue",
};

function Chapters({ id, goToChat, goBack }: IProps) {
  const currentChapter = lessonsController.currentChapter.get();
  if (!currentChapter) return null;

  return (
    <Panel id={id}>
      <div className={classes.panel}>
        <PanelHeader shadow before={<PanelHeaderBack onClick={goBack} />}>
          <PanelTitle
            mobileTitle="Темы"
            title={chapterTitles[currentChapter?.chapterType]}
          ></PanelTitle>
        </PanelHeader>
        {currentChapter && (
          <Lessons
            currentChapter={currentChapter}
            onClickLesson={(lesson) => {
              chatGpt.clearMessages();
              chatGpt.clearSystemMessage();
              lessonsController.setCurrentLesson(lesson.id);
              chatGpt.currentDialog = null;
              goToChat();
            }}
          />
        )}
      </div>
    </Panel>
  );
}

export default Chapters;
