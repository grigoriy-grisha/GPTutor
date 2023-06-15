import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import Cards from "$/components/Cards/Cards";
import {
  languages,
  lessonsController,
  ModeType,
  technologies,
} from "$/entity/lessons";
import PanelTitle from "$/components/PanelTitle";
import { useNavigationContext } from "$/NavigationContext";

import classes from "./Modes.module.css";
import { interviews } from "$/entity/interview";

interface IProps {
  id: string;
}

function Modes({ id }: IProps) {
  const { goBack, goToChapters, goToChatInterview, goToLeetcodeProblems } =
    useNavigationContext();

  console.log(technologies);
  return (
    <Panel id={id}>
      <AppContainer
        isSecondary
        className={classes.container}
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <PanelTitle
              mobileTitle="Режимы"
              title="Режимы для обучения"
            ></PanelTitle>
          </PanelHeader>
        }
      >
        <Cards
          isTop
          title="Языки программирования"
          chapters={languages}
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.type as ModeType);
            goToChapters();
          }}
        />
        <Cards
          title="Технологии"
          chapters={technologies}
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.type as ModeType);
            goToChapters();
          }}
        />

        <Cards
          title="Собеседования"
          chapters={interviews.interviews}
          onClickChapter={(chapter) => {
            interviews.setCurrentInterview(chapter.type as ModeType);
            goToChatInterview();
          }}
        />
        <Cards
          isBottom
          title="Собеседования"
          chapters={[{ type: ModeType.LeetCode }]}
          onClickChapter={goToLeetcodeProblems}
        />
      </AppContainer>
    </Panel>
  );
}

export default Modes;
