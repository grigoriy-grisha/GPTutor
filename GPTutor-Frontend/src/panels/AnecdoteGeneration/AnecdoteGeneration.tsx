import {
  Button,
  Card,
  Div,
  IconButton,
  Link,
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
import Time from "$/components/Time";

interface IProps {
  id: string;
}

function AnecdoteGeneration({ id }: IProps) {
  const { openApplicationInfoHumor } = useNavigationContext();

  const isLoadingText = chatGpt.chatGptAnecdote.sendCompletions$.loading.get();
  const isLoadingImage = !chatGpt.chatGptAnecdote.timerImage.isStopped$.get();

  const isLoading = isLoadingImage || isLoadingText;

  const badListError = chatGpt.chatGptAnecdote.badListError$.get();

  const isStopped = chatGpt.chatGptAnecdote.timer.isStopped$.get();
  const time = chatGpt.chatGptAnecdote.timer.time$.get();
  const subscriptionGPT = chatGpt.chatGptAnecdote.subscriptionGPT;

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
            <Div>
              {!subscriptionGPT.isSubscribe$.get() && (
                <>
                  <Card mode="outline">
                    <Div className={classes.subscription}>
                      <span>
                        <Title level="2">Наш паблик 🤡</Title>
                        <Link href="https://vk.com/nuuchetam" target="_blank">
                          <Spacing size={4} />
                          Подпишитесь на наше юмористическое сообщестово!
                          <Spacing size={10} />
                        </Link>
                      </span>
                      <Button size="m" onClick={subscriptionGPT.$subscribe}>
                        Подписаться
                      </Button>
                    </Div>
                  </Card>
                  <Spacing size={12} />
                </>
              )}

              <Button
                disabled={!isStopped}
                mode={!isStopped || isLoading ? "outline" : "primary"}
                onClick={() =>
                  isLoading
                    ? chatGpt.chatGptAnecdote.abortSend()
                    : chatGpt.chatGptAnecdote.send()
                }
                size="m"
                style={{ width: "100%" }}
                after={<Icon24MagicWandOutline />}
              >
                {isStopped ? (
                  isLoading ? (
                    "Отменить"
                  ) : (
                    "Перегенерировать"
                  )
                ) : (
                  <Time className={classes.time} seconds={time} />
                )}
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
