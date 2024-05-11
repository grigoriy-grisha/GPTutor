import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import {
  Button,
  IconButton,
  Panel,
  PanelHeaderBack,
  Placeholder,
  Title,
} from "@vkontakte/vkui";
import PanelTitle from "$/components/PanelTitle";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";

import classes from "./AnecdoteMain.module.css";

import anecdoteMain from "./anecdoteMain.png";
import { chatGpt } from "$/entity/GPT";
import { Icon28ServicesOutline } from "@vkontakte/icons";
import { FullscreenButton } from "$/components/FullscreenButton";

interface IProps {
  id: string;
}

function AnecdoteMain({ id }: IProps) {
  const { goToAnecdoteGeneration, openApplicationInfoHumor } =
    useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        className={classes.container}
        headerChildren={
          <AppPanelHeader
            isMiddle
            before={
              <IconButton
                onClick={openApplicationInfoHumor}
                className={classes.buttonService}
              >
                <Icon28ServicesOutline className={classes.iconService} />
              </IconButton>
            }
            after={<FullscreenButton />}
          >
            <Title level="3">НейроПриколы</Title>
          </AppPanelHeader>
        }
      >
        <Placeholder
          className={classes.placeholder}
          icon={<img src={anecdoteMain} />}
          header={<Title>НейроПриколы</Title>}
          action={
            <Button
              mode="outline"
              size="l"
              onClick={() => {
                goToAnecdoteGeneration();
                chatGpt.chatGptAnecdote.send();
              }}
            >
              Сгенерировать ✨
            </Button>
          }
        >
          Сгенерируй уникальный анектод с помощью нейросети
        </Placeholder>
      </AppContainer>
    </Panel>
  );
}

export default AnecdoteMain;
