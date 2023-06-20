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

import { interviews } from "$/entity/interview";
import { leetCode } from "$/entity/leetCode/LeetCode";
import { chatGpt } from "$/entity/GPT";

import classes from "./Modes.module.css";

interface IProps {
  id: string;
}

function Modes({ id }: IProps) {
  const { goBack, goToChapters, goToChatInterview, goToLeetcodeProblems } =
    useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        isSecondary
        className={classes.container}
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <PanelTitle mobileTitle="Режимы" title="Режимы"></PanelTitle>
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
            chatGpt.moveToInterviewChat(chapter.type, goToChatInterview);
          }}
        />
        <Cards
          isBottom
          title="Алгоритмы"
          chapters={[{ type: ModeType.LeetCode }]}
          onClickChapter={() => {
            leetCode.currentProblem = null;
            goToLeetcodeProblems();
          }}
        />
      </AppContainer>
    </Panel>
  );
}

export default Modes;
