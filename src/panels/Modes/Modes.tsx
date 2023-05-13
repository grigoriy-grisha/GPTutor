import React from "react";

import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
} from "@vkontakte/vkui";
import {
  Icon24ArrowRightSquareOutline,
  Icon56GhostOutline,
} from "@vkontakte/icons";

import { AppContainer } from "$/components/AppContainer";
import { CardBlock } from "$/components/CardBlock";
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
          isTop
          title="Технологии"
          chapters={technologies}
          onClickChapter={(chapter) => {
            lessonsController.setCurrentChapter(chapter.chapterType);
            goToChapters();
          }}
        />
        <CardBlock className={classes.bottomBlock} isBottom>
          <Placeholder
            icon={
              <Icon56GhostOutline fill="var(--vkui--color_background_accent_themed)" />
            }
            header="Здесь будут режимы подготовки к собеседованию"
            action={
              <Button
                href="https://vk.com/gptutor"
                target="_blank"
                after={<Icon24ArrowRightSquareOutline />}
              >
                Перейти в сообщество
              </Button>
            }
          >
            Следите за обновленями в сообществе!
          </Placeholder>
        </CardBlock>
      </AppContainer>
    </Panel>
  );
}

export default Modes;
