import React from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { lessonsController } from "$/entity/lessons";

import Repository from "./Repository";
import Issues from "./Issues";
import Stack from "./Stack";

import classes from "./OpenSource.module.css";

interface IProps {
  id: string;
  goBack: () => void;
  goToChapters: () => void;
}

function OpenSource({ id, goBack, goToChapters }: IProps) {
  return (
    <Panel id={id}>
      <AppContainer
        isSecondary
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Присоединяйся
          </PanelHeader>
        }
      >
        <div className={classes.container}>
          <Stack
            onClickStack={(chapter) => {
              if (!chapter) return;
              lessonsController.setCurrentChapter(chapter);
              goToChapters();
            }}
          />
          <Repository />
          <Issues />
        </div>
      </AppContainer>
    </Panel>
  );
}

export default OpenSource;
