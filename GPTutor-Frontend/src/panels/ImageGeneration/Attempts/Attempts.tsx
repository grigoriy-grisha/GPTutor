import React from "react";

import {
  Button,
  Card,
  Div,
  Platform,
  Text,
  Title,
  usePlatform,
} from "@vkontakte/vkui";

import { plural } from "$/utility/strings";

import classes from "./Attempts.module.css";

function getAttemptColor(attempts: number) {
  if (attempts < 10) return classes.negative;
  if (attempts < 25) return classes.orange;
  return classes.positive;
}

function Attempts() {
  const platform = usePlatform();

  const attempts = 50;
  return (
    <Card mode="shadow">
      <Div className={classes.container}>
        <Text className={classes.text} weight="1">
          <Title
            style={{ display: "inline" }}
            level="2"
            className={getAttemptColor(attempts)}
          >
            {attempts}
          </Title>{" "}
          <span>
            {plural(attempts, ["Генерация", "Генерации", "Генераций"])}
          </span>
        </Text>
        <Button size="s" mode="secondary" width="100%">
          {platform === Platform.VKCOM ? "Добавить генерации" : "Добавить"}
        </Button>
      </Div>
    </Card>
  );
}

export default Attempts;
