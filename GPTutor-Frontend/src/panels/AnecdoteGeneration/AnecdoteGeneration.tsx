import {
  Button,
  Div,
  IconButton,
  Panel,
  Spacing,
  Title,
} from "@vkontakte/vkui";
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

  const isLoadingText = chatGpt.chatGptAnecdote.sendCompletions$.loading.get();
  const isLoadingImage = !chatGpt.chatGptAnecdote.timerImage.isStopped$.get();

  const isLoading = isLoadingImage || isLoadingText;

  const badListError = chatGpt.chatGptAnecdote.badListError$.get();
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
          <>
            {/*<FormItem*/}
            {/*  status={badListError ? "error" : "default"}*/}
            {/*  bottom={badListError ? "Недопустимое содержание!" : ""}*/}
            {/*  onFocus={() => chatGpt.chatGptAnecdote.clearBadListError()}*/}
            {/*>*/}
            {/*<Textarea*/}
            {/*  value={chatGpt.chatGptAnecdote.value$.get()}*/}
            {/*  onChange={(e) =>*/}
            {/*    chatGpt.chatGptAnecdote.setValue(e.target.value)*/}
            {/*  }*/}
            {/*  disabled={isLoading}*/}
            {/*  placeholder="Про что анекдот"*/}
            {/*/>*/}
            {/*</FormItem>*/}
            <Div>
              <Spacing size={12} />
              <Button
                mode={isLoading ? "outline" : "primary"}
                onClick={() =>
                  isLoading
                    ? chatGpt.chatGptAnecdote.abortSend()
                    : chatGpt.chatGptAnecdote.send()
                }
                size="m"
                style={{ width: "100%" }}
                after={<Icon24MagicWandOutline />}
              >
                {isLoading ? "Отменить" : "Перегенерировать"}
              </Button>
            </Div>
          </>
        }
      >
        <Spacing size={12} />
        <AnecdoteGenerationContent />
        <Spacing size={12} />
      </AppContainer>
    </Panel>
  );
}

export default AnecdoteGeneration;
