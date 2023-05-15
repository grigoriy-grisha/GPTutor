import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import Cards from "$/components/Cards/Cards";
import { languages, lessonsController, technologies } from "$/entity/lessons";
import PanelTitle from "$/components/PanelTitle";

import classes from "./Modes.module.css";

interface IProps {
  id: string;
  goBack: () => void;
  goToChapters: () => void;
}

function Modes({ id, goBack, goToChapters }: IProps) {
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
            lessonsController.setCurrentChapter(chapter.chapterType);
            goToChapters();
          }}
        />
        <Cards
          title="Технологии"
          chapters={technologies}
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.chapterType);
            goToChapters();
          }}
        />
      </AppContainer>
    </Panel>
  );
}

export default Modes;
