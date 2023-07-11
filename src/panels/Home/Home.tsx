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
import { trainers } from "$/entity/Trainers";

interface IProps {
  id: string;
}

const chapters = [
  ...lessonsController.chapters,
  ...trainers.items,
  ...interviews.interviews,
  { type: ModeType.LeetCode, header: "Решебник задач" },
].sort(() => (Math.random() > 0.5 ? 1 : -1));

function Home({ id }: IProps) {
  const {
    goToChapters,
    goToChatFree,
    goToChatInterview,
    goToLeetcodeProblems,
    goToEditor,
  } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        className={classes.group}
        isSecondary
        headerChildren={<HomeHeader />}
      >
        <Cards
          chapters={chapters}
          isTop
          title="Все режимы"
          onClickChapter={(chapter) => {
            if (chapter.type === ModeType.LeetCode) {
              goToLeetcodeProblems();
              return;
            }

            if (chapter.type.includes("TRAINING")) {
              trainers.setCurrentTrainer(chapter.type as ModeType);
              trainers.getCurrentTrainer()?.setInitialValue();
              chatGpt.chatGptTrainer.messages$.set([]);
              goToEditor();
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
