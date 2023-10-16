import React from "react";

import { Button, Card, Div, Text, Title } from "@vkontakte/vkui";

import { plural } from "$/utility/strings";

import classes from "./Attempts.module.css";

function getAttemptColor(attempts: number) {
  if (attempts < 10) return classes.negative;
  if (attempts < 25) return classes.orange;
  return classes.positive;
}

function Attempts() {
  const attempts = 50;
  return (
    <Card mode="outline">
      <Div className={classes.container}>
        <Text className={classes.text} weight="1">
          <span>{plural(attempts, ["Осталась", "Осталось", "Осталось"])}</span>
          <Title
            style={{ display: "inline" }}
            level="2"
            className={getAttemptColor(attempts)}
          >
            {attempts}
          </Title>{" "}
          <span>
            {plural(attempts, ["генерация", "генерации", "генераций"])}
          </span>
        </Text>
        <Button size="s" mode="secondary" width="100%">
          Добавить генерации
        </Button>
      </Div>
    </Card>
  );
}

export default Attempts;
