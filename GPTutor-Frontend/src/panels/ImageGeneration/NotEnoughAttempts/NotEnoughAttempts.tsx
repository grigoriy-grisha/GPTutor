import React from "react";

import { Button, Card, Counter, Div, Spacing, Title } from "@vkontakte/vkui";
import { Icon28CancelCircleFillRed } from "@vkontakte/icons";

import classes from "./NotEnoughAttempts.module.css";
import { useNavigationContext } from "$/NavigationContext";
import { attempts } from "$/entity/attempts";

function NotEnoughAttempts() {
  const { goToImageDonutModal } = useNavigationContext();
  const freeCount = attempts.$attemptsToFree.get();

  return (
    <Card mode="shadow">
      <Div>
        <div>
          <Title level="3" weight="2" className={classes.text}>
            <Icon28CancelCircleFillRed className={classes.icon} /> У вас
            закончились запросы! Пополните баланс или заработайте бесплатно
          </Title>
          <Spacing size={12} />
          <Button
            after={
              !!freeCount && (
                <Counter mode="primary" size="s">
                  {freeCount}
                </Counter>
              )
            }
            mode="secondary"
            className={classes.button}
            onClick={goToImageDonutModal}
          >
            Получить
          </Button>
        </div>
      </Div>
    </Card>
  );
}

export default NotEnoughAttempts;
