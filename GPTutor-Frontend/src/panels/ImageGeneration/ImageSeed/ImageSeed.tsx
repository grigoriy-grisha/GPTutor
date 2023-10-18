import React from "react";

import { Caption, Tappable, Text } from "@vkontakte/vkui";

import classes from "./ImageSeed.module.css";
import { copyService } from "$/services/CopyService";
import { snackbarNotify } from "$/entity/notify";

interface IProps {
  seed: string;
}

function ImageSeed({ seed }: IProps) {
  function copyToClickBoard() {
    copyService.copyToClickBoard$
      .run(seed)
      .then(() => {
        snackbarNotify.notify({ type: "success", message: "Cид скопирован" });
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
          {seed}
        </Text>
      </Tappable>
    </Caption>
  );
}

export default ImageSeed;
