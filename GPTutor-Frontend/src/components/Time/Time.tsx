import React from "react";
import { classNames, Title } from "@vkontakte/vkui";

import classes from "./Time.module.css";

interface IProps {
  seconds: number;
  className?: string;
}

function format(value: number) {
  if (value < 10) return `0${value}`;
  return value;
}
function getMinute(seconds: number) {
  return Math.floor(seconds / 60);
}

function getSeconds(seconds: number) {
  return seconds % 60;
}

function Time({ seconds, className }: IProps) {
  return (
    <Title level="3" className={classNames(className, classes.time)}>
      {getMinute(seconds)}:{format(getSeconds(seconds))}
    </Title>
  );
}

export default Time;
