import React from "react";

import { Caption, Card, Div, Spacing, Text } from "@vkontakte/vkui";
import { Icon24ClockOutline } from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";

function TimeGenerationInfo() {
  return (
    <Card mode="shadow">
      <Div className={classes.time}>
        <div className={classes.timeIcon}>
          <Icon24ClockOutline />
        </div>
        <div>
          <Caption>Среднее время ожидания 15 секунд</Caption>
          <Spacing size={4} />
          <Caption>Максимальное время 100 секунд</Caption>
        </div>
      </Div>
    </Card>
  );
}

export default TimeGenerationInfo;
