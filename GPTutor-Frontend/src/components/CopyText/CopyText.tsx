import React from "react";

import { Caption, Tappable, Text } from "@vkontakte/vkui";

import classes from "./CopyText.module.css";
import { copyService } from "$/services/CopyService";
import { snackbarNotify } from "$/entity/notify";

interface IProps {
  text: string;
}

function CopyText({ text }: IProps) {
  function copyToClickBoard() {
    copyService.copyToClickBoard$
      .run(text)
      .then(() => {
        snackbarNotify.notify({ type: "success", message: "Скопировано" });
      })
      .catch(() =>
        snackbarNotify.notify({
          type: "error",
          message: "Не удалось скопировать",
        })
      );
  }

  return (
    <Caption className={classes.caption}>
      Сид:{" "}
      <Tappable onClick={copyToClickBoard}>
        <Text weight="2" className={classes.seed}>
          {text}
        </Text>
      </Tappable>
    </Caption>
  );
}

export default CopyText;
