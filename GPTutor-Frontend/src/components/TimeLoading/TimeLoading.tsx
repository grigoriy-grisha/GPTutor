import React from "react";

import { Icon28HourglassOutline } from "@vkontakte/icons";
import Time from "$/components/Time";
import { StopWatch } from "$/entity/stopWatch";

import classes from "./TimeLoading.module.css";

interface IProps {
  timer: StopWatch;
}

function TimeLoading({ timer }: IProps) {
  return (
    <div className={classes.container}>
      <Icon28HourglassOutline
        className={classes.timer}
        width={56}
        height={56}
      />
      <Time level="1" milliseconds={timer.time$.get()} />
    </div>
  );
}
export default TimeLoading;
