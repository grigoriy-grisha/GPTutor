import React from "react";
import { Banner } from "@vkontakte/vkui";
import classes from "./ErrorBlock.module.css";
import { Icon16ErrorCircleFill } from "@vkontakte/icons";

function ErrorBlock() {
  return (
    <Banner
      className={classes.errorBlock}
      before={<Icon16ErrorCircleFill width={28} height={28} />}
      header="Данное сообщение пришлось скрыть"
      subheader="Cообщение содержит грубое или оскорбляющее содержание. Chat GPT не будет отвечать на это."
    />
  );
}

export default ErrorBlock;
