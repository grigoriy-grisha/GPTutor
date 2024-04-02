import React from "react";
import { Panel, PanelHeader, PanelHeaderBack, Title } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { lessonsController } from "$/entity/lessons";

import Repository from "./Repository";
import Issues from "./Issues";
import Stack from "./Stack";

import classes from "./OpenSource.module.css";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function OpenSource({ id }: IProps) {
  const { goBack, goToChapters } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        isSecondary
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title level="1" Component="h1">Присоединяйся</Title>
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
