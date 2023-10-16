import React from "react";
import { classNames, Title } from "@vkontakte/vkui";

import classes from "./Time.module.css";

interface IProps {
  level?: "1" | "2" | "3";
  seconds?: number;
  milliseconds?: number;
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

function getSecond(milliseconds: number) {
  return Math.floor(milliseconds / 1000);
}

function Time({ level = "3", seconds, milliseconds, className }: IProps) {
  if (milliseconds) {
    return (
      <Title level={level} className={classNames(className, classes.time)}>
        {format(getSecond(milliseconds))}:
        {format(Math.floor((milliseconds % 1000) / 10))}
      </Title>
    );
  }

  if (seconds) {
    return (
      <Title level={level} className={classNames(className, classes.time)}>
        {getMinute(seconds)}:{format(getSeconds(seconds))}
      </Title>
    );
  }

  return null;
}

export default Time;
