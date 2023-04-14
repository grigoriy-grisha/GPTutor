import React, { memo } from "react";

import {
  Icon24Copy,
  Icon28CancelOutline,
  Icon28DoneOutline,
} from "@vkontakte/icons";
import { IconButton, Snackbar } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import ReactivePromise from "../../services/ReactivePromise";
import { InPortal } from "../InPortal";
import classes from "./Copy.module.css";

const copyToClickBoard$ = ReactivePromise.create((text: string) =>
  bridge.send("VKWebAppCopyText", { text })
);

interface IProps {
  className?: string;
  textToClickBoard: string;
  onAfterClickBoard?: () => void;
}
function Copy({ className, textToClickBoard, onAfterClickBoard }: IProps) {
  function copyToClickBoard(text: string) {
    copyToClickBoard$.run(text).then(() => {
      onAfterClickBoard?.();
    });
  }

  return (
    <>
      <IconButton
        className={className}
        onClick={() => copyToClickBoard(textToClickBoard)}
      >
        <Icon24Copy />
        {copyToClickBoard$.error.get()}
      </IconButton>
      {copyToClickBoard$.done.get() && (
        <InPortal id="root">
          <Snackbar
            onClose={() => copyToClickBoard$.reset()}
            before={
              copyToClickBoard$.success.get() ? (
                <Icon28DoneOutline className={classes.doneIcon} />
              ) : (
                <Icon28CancelOutline className={classes.doneIcon} />
              )
            }
          >
            {copyToClickBoard$.success.get()
              ? "Скопировано"
              : "Не удалось скопировать"}
          </Snackbar>
        </InPortal>
      )}
    </>
  );
}

export default memo(Copy);
