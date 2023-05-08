import React from "react";

import {
  Panel,
  Platform,
  Separator,
  Tabbar,
  TabbarItem,
  usePlatform,
} from "@vkontakte/vkui";
import {
  Icon28BookSpreadOutline,
  Icon28HistoryBackwardOutline,
} from "@vkontakte/icons";

import { AppContainer } from "$/components/AppContainer";
import Cards from "$/components/Cards";
import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";

import FreeDialogBlock from "./FreeDialogBlock";
import HomeHeader from "./HomeHeader";

import classes from "./Home.module.css";

interface IProps {
  id: string;
  goToChapters: () => void;
  goToChat: () => void;
  goToOpenSource: () => void;
  goToHistory: () => void;
  goToModes: () => void;
}

function Home({
  id,
  goToModes,
  goToChapters,
  goToChat,
  goToOpenSource,
  goToHistory,
}: IProps) {
  const platform = usePlatform();

  return (
    <Panel id={id}>
      <AppContainer
        className={classes.group}
        maxHeight
        isSecondary
        headerChildren={<HomeHeader goToOpenSource={goToOpenSource} />}
      >
        <Cards
          chapters={lessonsController.chapters}
          isTop
          title="Все темы для обучения"
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.chapterType);
            goToChapters();
          }}
        />
        <FreeDialogBlock
          goToFreeDialog={() => {
            goToChat();
            lessonsController.clearLesson();
            chatGpt.currentDialog = null;
          }}
        />
        <Tabbar
          className={classes.tabBar}
          mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
        >
          <Separator wide style={{ width: "100%" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TabbarItem
              className={classes.tabItem}
              text="Режимы для изучения"
              onClick={goToModes}
            >
              <Icon28BookSpreadOutline />
            </TabbarItem>
            <TabbarItem
              className={classes.tabItem}
              text="История диалогов"
              onClick={goToHistory}
            >
              <Icon28HistoryBackwardOutline />
            </TabbarItem>
          </div>
        </Tabbar>
      </AppContainer>
    </Panel>
  );
}

export default Home;
