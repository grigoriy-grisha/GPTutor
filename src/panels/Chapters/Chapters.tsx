import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { ChapterTypes, lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import PanelTitle from "$/components/PanelTitle";

import Lessons from "./Lessons";
import { useNavigationContext } from "$/NavigationContext";
import { AppContainer } from "$/components/AppContainer";

interface IProps {
  id: string;
}

const chapterTitles: Record<ChapterTypes, string> = {
  [ChapterTypes.React]: "Темы React",
  [ChapterTypes.Typescript]: "Темы Typescript",
  [ChapterTypes.HTMLCSS]: "Темы HTML и CSS",
  [ChapterTypes.Git]: "Темы Git",
  [ChapterTypes.JS]: "Темы JavaScript",
  [ChapterTypes.Vue]: "Темы Vue",
};

function Chapters({ id }: IProps) {
  const { goBack, goToChat } = useNavigationContext();

  const currentChapter = lessonsController.currentChapter.get();
  if (!currentChapter) return null;

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <PanelHeader shadow before={<PanelHeaderBack onClick={goBack} />}>
            <PanelTitle
              mobileTitle="Темы"
              title={chapterTitles[currentChapter?.chapterType]}
            ></PanelTitle>
          </PanelHeader>
        }
      >
        {currentChapter && (
          <Lessons
            currentChapter={currentChapter}
            onClickLesson={(lesson) =>
              chatGpt.moveToLessonChat(lesson, goToChat)
            }
          />
        )}
      </AppContainer>
    </Panel>
  );
}

export default Chapters;
