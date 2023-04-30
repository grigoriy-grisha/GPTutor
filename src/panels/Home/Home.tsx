import React from "react";

import { Panel } from "@vkontakte/vkui";

import { lessonsController } from "$/entity/lessons";
import { AppContainer } from "$/components/AppContainer";

import Cards from "./Cards";
import FreeDialogBlock from "./FreeDialogBlock";
import HomeHeader from "./HomeHeader";

import classes from "./Home.module.css";

interface IProps {
  id: string;
  goToChapters: () => void;
  goToChat: () => void;
  goToOpenSource: () => void;
}

function Home({ id, goToChapters, goToChat, goToOpenSource }: IProps) {
  return (
    <Panel id={id}>
      <AppContainer
        className={classes.group}
        maxHeight
        isSecondary
        headerChildren={<HomeHeader goToOpenSource={goToOpenSource} />}
      >
        <Cards
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.chapterType);
            goToChapters();
          }}
        />
        <FreeDialogBlock
          goToFreeDialog={() => {
            goToChat();
            lessonsController.clearLesson();
          }}
        />
      </AppContainer>
    </Panel>
  );
}

export default Home;
