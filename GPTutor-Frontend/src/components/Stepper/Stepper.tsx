import React from "react";

import { Button, Title } from "@vkontakte/vkui";
import { Icon16Minus } from "@vkontakte/icons";

import classes from "./Stepper.module.css";

function Stepper() {
  return (
    <div className={classes.stepper}>
      <Button size="m" mode="outline">
        <Title level="1" Component="h1">
          <Icon16Minus />
        </Title>
      </Button>
      <Title level="2" className={classes.value} Component="h2">
        1
      </Title>
      <Button size="m" mode="outline">
        <Title className={classes.actionText} level="1" Component="h1">
          +
        </Title>
      </Button>
    </div>
  );
}

export default Stepper;
