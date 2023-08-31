import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { lessonsController, ModeType } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import PanelTitle from "$/components/PanelTitle";

import Lessons from "./Lessons";
import { useNavigationContext } from "$/NavigationContext";
import { AppContainer } from "$/components/AppContainer";

interface IProps {
  id: string;
}

const chapterTitles: Record<string, string> = {
  [ModeType.React]: "Темы React",
  [ModeType.Typescript]: "Темы Typescript",
  [ModeType.HTMLCSS]: "Темы HTML и CSS",
  [ModeType.Git]: "Темы Git",
  [ModeType.JS]: "Темы JavaScript",
  [ModeType.Vue]: "Темы Vue",
  [ModeType.Go]: "Темы Go",
  [ModeType.Vue]: "Темы Vue",
};

function Chapters({ id }: IProps) {
  const { goBack, goToChatLesson } = useNavigationContext();

  const currentChapter = lessonsController.currentChapter.get();
  if (!currentChapter) return null;

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <PanelHeader shadow before={<PanelHeaderBack onClick={goBack} />}>
            <PanelTitle
              mobileTitle="Темы"
              title={chapterTitles[currentChapter?.type]}
            ></PanelTitle>
          </PanelHeader>
        }
      >
        {currentChapter && (
          <Lessons
            currentChapter={currentChapter}
            onClickLesson={(lesson) =>
              chatGpt.moveToLessonChat(lesson, goToChatLesson)
            }
          />
        )}
      </AppContainer>
    </Panel>
  );
}

export default Chapters;
