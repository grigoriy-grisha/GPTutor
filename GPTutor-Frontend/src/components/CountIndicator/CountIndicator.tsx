import React from "react";
import { classNames, Title } from "@vkontakte/vkui";

import classes from "./CountIndicator.module.css";

function getAttemptColor(
  negativeCount: number,
  warningCount: number,
  attempts: number
) {
  if (attempts < negativeCount) return classes.negative;
  if (attempts < warningCount) return classes.orange;
  return classes.positive;
}

interface IProps {
  negativeCount: number;
  warningCount: number;
  count: number;
}

function CountIndicator({ negativeCount, warningCount, count }: IProps) {
  return (
    <Title
      style={{ display: "inline" }}
      level="2"
      className={getAttemptColor(negativeCount, warningCount, count)}
      Component="h2"
    >
      {count}
    </Title>
  );
}

export default CountIndicator;
