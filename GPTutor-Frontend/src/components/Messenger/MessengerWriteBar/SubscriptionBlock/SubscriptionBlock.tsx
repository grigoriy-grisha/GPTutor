import React from "react";

import {
  Div,
  Separator,
  Title,
  Text,
  Button,
  classNames,
} from "@vkontakte/vkui";

import classes from "./SubscriptionBlock.module.css";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { plural } from "$/utility/strings";

interface IProps {
  chatGpt: ChatGptTemplate;
}

function SubscriptionBlock({ chatGpt }: IProps) {
  const subscriptionGPT = chatGpt.subscriptionGPT;

  if (subscriptionGPT.isSubscribe$.get()) return null;

  const attempts = subscriptionGPT.$attempts.get();
  return (
    <div>
      <Separator wide />
      <Div className={classes.container}>
        <div className={classes.text}>
          <Title level="3" className={classes.title}>
            {plural(attempts, ["Доступен", "Доступно", "Доступно"])}{" "}
            <Title
              level="1"
              className={classNames(classes.count, {
                [classes.countError]: attempts === 0,
              })}
            >
              {attempts}
            </Title>{" "}
            {plural(attempts, ["запрос", "запроса", "запросов"])}
          </Title>
          <Text weight="2" className={classes.subTitle}>
            Подпишитесь на группу, чтобы убрать ограничения 😉
          </Text>
        </div>
        <Button onClick={subscriptionGPT.$subscribe}>Подписаться</Button>
      </Div>
    </div>
  );
}

export default SubscriptionBlock;
