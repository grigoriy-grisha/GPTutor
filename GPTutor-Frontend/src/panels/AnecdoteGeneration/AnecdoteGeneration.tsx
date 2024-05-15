import { Button, Div, IconButton, Panel, Title } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import React from "react";

import {
  Icon24MagicWandOutline,
  Icon28ServicesOutline,
} from "@vkontakte/icons";
import { chatGpt } from "$/entity/GPT";
import { AnecdoteGenerationContent } from "$/panels/AnecdoteGeneration/AnecdoteGenerationContent";

import background from "./anecdoteGenerationBackground.png";
import { useNavigationContext } from "$/NavigationContext";
import { FullscreenButton } from "$/components/FullscreenButton";

import classes from "./AnecdoteGeneration.module.css";

interface IProps {
  id: string;
}

function AnecdoteGeneration({ id }: IProps) {
  const { openApplicationInfoHumor } = useNavigationContext();

  const isLoading = chatGpt.chatGptAnecdote.sendCompletions$.loading.get();

  return (
    <Panel id={id}>
      <AppContainer
        style={{ backgroundImage: `url(${background})` }}
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
        fixedBottomContent={
          <Div>
            <Button
              mode={isLoading ? "outline" : "primary"}
              onClick={() => {
                if (isLoading) {
                  chatGpt.chatGptAnecdote.abortSend();
                  return;
                }
                chatGpt.chatGptAnecdote.send();
              }}
              size="m"
              style={{ width: "100%" }}
              after={<Icon24MagicWandOutline />}
            >
              {isLoading ? "Отменить" : "Перегенерировать"}
            </Button>
          </Div>
        }
      >
        <AnecdoteGenerationContent />
      </AppContainer>
    </Panel>
  );
}

export default AnecdoteGeneration;
