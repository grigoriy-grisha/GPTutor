import {
  Button,
  Div,
  IconButton,
  Panel,
  PanelHeaderBack,
  Platform,
  Title,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import PanelTitle from "$/components/PanelTitle";
import React from "react";

import classes from "./AnecdoteGeneration.module.css";
import {
  Icon24MagicWandOutline,
  Icon28ServicesOutline,
} from "@vkontakte/icons";
import { imageGeneration } from "$/entity/image";
import { chatGpt } from "$/entity/GPT";
import { AnecdoteGenerationContent } from "$/panels/AnecdoteGeneration/AnecdoteGenerationContent";

import background from "./anecdoteGenerationBackground.png";
import { useNavigationContext } from "$/NavigationContext";
import { FullscreenButton } from "$/components/FullscreenButton";

interface IProps {
  id: string;
}

console.log(background);

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
