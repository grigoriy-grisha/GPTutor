import { classNames, Counter } from "@vkontakte/vkui";
import React from "react";

import classes from "./StatusTag.module.css";

type StatusType = 1 | 2 | 3;

interface IProps {
  status: StatusType;
}

function getText(status: StatusType) {
  if (status === 1) return "Eazy";
  if (status === 2) return "Medium";

  return "Hard";
}

function getClassName(status: StatusType) {
  if (status === 1) return classes.eazy;
  if (status === 2) return classes.medium;
  return classes.hard;
}

function StatusTag({ status }: IProps) {
  return (
    <Counter className={classNames(classes.tag, getClassName(status))}>
      {getText(status)}
    </Counter>
  );
}

export default StatusTag;
