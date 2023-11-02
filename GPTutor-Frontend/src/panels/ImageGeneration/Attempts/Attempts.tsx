import React from "react";

import {
  Button,
  Card,
  Counter,
  Div,
  Platform,
  Text,
  Title,
  usePlatform,
} from "@vkontakte/vkui";

import { plural } from "$/utility/strings";

import classes from "./Attempts.module.css";
import { useNavigationContext } from "$/NavigationContext";
import CountIndicator from "../../../components/CountIndicator/CountIndicator";
import { attempts } from "$/entity/attempts";

function getAttemptColor(attempts: number) {
  if (attempts < 10) return classes.negative;
  if (attempts < 25) return classes.orange;
  return classes.positive;
}

function Attempts() {
  const { goToImageDonutModal } = useNavigationContext();
  const platform = usePlatform();

  const count = attempts.$requests.get();
  const freeCount = attempts.$attemptsToFree.get();

  return (
    <Card mode="shadow">
      <Div className={classes.container}>
        <Text className={classes.text} weight="1">
          <CountIndicator negativeCount={3} warningCount={6} count={count} />{" "}
          <span>{plural(count, ["Генерация", "Генерации", "Генераций"])}</span>
        </Text>
        <Button
          size="m"
          mode="secondary"
          width="100%"
          onClick={goToImageDonutModal}
          after={
            !!freeCount && (
              <Counter mode="primary" size="s">
                {freeCount}
              </Counter>
            )
          }
        >
          {platform === Platform.VKCOM ? "Добавить генерации" : "Добавить"}
        </Button>
      </Div>
    </Card>
  );
}

export default Attempts;
