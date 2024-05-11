import React, { useState } from "react";
import {
  Card,
  classNames,
  Div,
  IconButton,
  Panel,
  Tappable,
  Title,
} from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";

import classes from "./AnecdoteNews.module.css";
import {
  Icon20LikeCircleFillGray,
  Icon20LikeCircleFillRed,
  Icon28ServicesOutline,
  Icon28ShareOutline,
} from "@vkontakte/icons";
import { FullscreenButton } from "$/components/FullscreenButton";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function AnecdoteNews({ id }: IProps) {
  const { openApplicationInfoHumor } = useNavigationContext();

  const [s, ss] = useState(false);
  return (
    <Panel id={id}>
      <AppContainer
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
            <Title level="3">Лента</Title>
          </AppPanelHeader>
        }
      >
        <Div className={classes.container}>
          <Card mode="shadow" className={classes.card}>
            <Div>
              <Title level="3" weight="2">
                Сидим в компании одноклассников, отмечаем 10-летний юбилей
                расставания со школой и друг с другом. Один из нас, по жизни
                холостой, пытает давно замужнюю одноклассницу, есть ли у неё
                симпатичная незамужняя подруга для встреч и дальнейшей жизни.Та
                его пытает:- а ты её любить будешь? - буду- а подарки дарить? -
                будr- а трахать ее будешь? - буду!- а квартира у тебя есть? -
                есть - да бери меня, зачем тебе моя подруга!В общем, уже 20 лет
                вместе, трое детей и внук.
              </Title>

              <div className={classes.actionsContainer}>
                <Card
                  className={classNames(classes.likeCard, {
                    [classes.likeActiveCard]: s,
                  })}
                >
                  <Tappable
                    onClick={() => {
                      ss(!s);
                    }}
                    className={classes.like}
                  >
                    {s ? (
                      <Icon20LikeCircleFillRed className={classes.likeActive} />
                    ) : (
                      <Icon20LikeCircleFillGray />
                    )}
                    123
                  </Tappable>
                </Card>
                <Card style={{ marginLeft: 12 }}>
                  <Tappable
                    className={classes.share}
                    onClick={() => {
                      ss(!s);
                    }}
                  >
                    <Icon28ShareOutline width={20} height={20} />
                  </Tappable>
                </Card>
              </div>
            </Div>
          </Card>
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default AnecdoteNews;
