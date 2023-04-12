import React, { memo, useState } from "react";

import {
  Icon24Copy,
  Icon28CancelOutline,
  Icon28DoneOutline,
} from "@vkontakte/icons";
import { IconButton, Snackbar } from "@vkontakte/vkui";

import { InPortal } from "../InPortal";

import classes from "./Copy.module.css";
import bridge from "@vkontakte/vk-bridge";

interface IProps {
  className?: string;
  textToClickBoard: string;
  onAfterClickBoard?: () => void;
}

function Copy({ className, textToClickBoard, onAfterClickBoard }: IProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function copyToClickBoard(text: string) {
    bridge
      .send("VKWebAppCopyText", {
        text,
      })
      .then(() => {
        onAfterClickBoard && onAfterClickBoard();
        setSuccess(true);
      })
      .catch(() => setError(true));
  }

  return (
    <>
      <IconButton
        className={className}
        onClick={() => {
          copyToClickBoard(textToClickBoard);
        }}
      >
        <Icon24Copy />
      </IconButton>
      {(success || error) && (
        <InPortal id="root">
          <Snackbar
            onClose={() => {
              setSuccess(false);
              setError(false);
            }}
            before={
              success ? (
                <Icon28DoneOutline className={classes.doneIcon} />
              ) : (
                <Icon28CancelOutline className={classes.doneIcon} />
              )
            }
          >
            {success ? "Скопировано" : "Не удалось скопировать"}
          </Snackbar>
        </InPortal>
      )}
    </>
  );
}

export default memo(Copy);
