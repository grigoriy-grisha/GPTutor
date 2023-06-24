import React from "react";

import { Panel } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import Cards from "$/components/Cards";
import { lessonsController, ModeType } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import { interviews } from "$/entity/interview";

import FreeDialogBlock from "./FreeDialogBlock";
import HomeHeader from "./HomeHeader";

import classes from "./Home.module.css";

interface IProps {
  id: string;
}

function Home({ id }: IProps) {
  const {
    goToChapters,
    goToChatFree,
    goToChatInterview,
    goToLeetcodeProblems,
  } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        className={classes.group}
        isSecondary
        headerChildren={<HomeHeader />}
      >
        <Cards
          chapters={[
            ...lessonsController.chapters,
            ...interviews.interviews,
            { type: ModeType.LeetCode },
          ]}
          isTop
          title="Все темы для обучения"
          onClickChapter={(chapter) => {
            if (chapter.type === ModeType.LeetCode) {
              goToLeetcodeProblems();
              return;
            }

            if (chapter.type.includes("INTERVIEW")) {
              chatGpt.moveToInterviewChat(chapter.type, goToChatInterview);
              return;
            }

            lessonsController.setCurrentChapter(chapter.type as ModeType);
            goToChapters();
          }}
        />
        <FreeDialogBlock
          goToFreeDialog={() => chatGpt.moveToFreeChat(goToChatFree)}
        />
      </AppContainer>
    </Panel>
  );
}

export default Home;
