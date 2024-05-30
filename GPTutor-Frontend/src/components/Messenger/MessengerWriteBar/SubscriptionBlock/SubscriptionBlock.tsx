import React from "react";

import {
  Button,
  Caption,
  classNames,
  Div,
  IconButton,
  Platform,
  Separator,
  Title,
  usePlatform,
} from "@vkontakte/vkui";

import classes from "./SubscriptionBlock.module.css";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { plural } from "$/utility/strings";
import { Icon28Cancel } from "@vkontakte/icons";
import { tgService } from "$/services/TgService";

interface IProps {
  chatGpt: ChatGptTemplate;
}

function SubscriptionBlock({ chatGpt }: IProps) {
  const platform = usePlatform();

  const subscriptionGPT = chatGpt.subscriptionGPT;

  if (subscriptionGPT.isSubscribe$.get()) return null;

  const attempts = subscriptionGPT.$attempts.get();

  return (
    <div>
      {!tgService.isSeeTg$.get() && (
        <>
          <Separator wide />
          <Div className={classes.container}>
            <div className={classes.text}>
              <Title level="3" className={classes.title} Component="h3">
                Попробуйте наш бот в телеграм!
              </Title>
              <Caption>Бесплатный GPT-4o в интерфейсе телеграм!</Caption>
            </div>
            <div className={classes.container}>
              <Button
                target="_blank"
                href="https://t.me/DeepGPTBot"
                mode="outline"
              >
                Перейти
              </Button>
              <IconButton onClick={() => tgService.setSeeTg()}>
                <Icon28Cancel className={classes.close} />
              </IconButton>
            </div>
          </Div>
        </>
      )}
      <Separator wide />
      <Div className={classes.container}>
        <div className={classes.text}>
          <Title level="3" className={classes.title} Component="h3">
            {platform === Platform.VKCOM &&
              plural(attempts, ["Доступен", "Доступно", "Доступно"])}{" "}
            <Title
              level="1"
              className={classNames(classes.count, {
                [classes.countError]: attempts === 0,
              })}
              Component="h1"
            >
              {attempts}
            </Title>{" "}
            {plural(attempts, ["запрос", "запроса", "запросов"])}
          </Title>
          <span>
            Бот бесплатный
            <Caption weight="2" className={classes.subTitle}>
              Подпишитесь на группу, чтобы убрать ограничения 😉
            </Caption>
          </span>
        </div>
        <Button onClick={subscriptionGPT.$subscribe}>Подписаться</Button>
      </Div>
    </div>
  );
}

export default SubscriptionBlock;
