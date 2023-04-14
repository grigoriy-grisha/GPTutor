import React, { memo, useState } from "react";

import {
  Icon24Copy,
  Icon28CancelOutline,
  Icon28CopyOutline,
  Icon28DoneOutline,
} from "@vkontakte/icons";
import { Button, IconButton, Snackbar } from "@vkontakte/vkui";

import { InPortal } from "../InPortal";
import { copyService } from "../../services/CopyService";

import classes from "./Copy.module.css";

interface IProps {
  isButton?: boolean;
  className?: string;
  textToClickBoard: string;
  onAfterClickBoard?: () => void;
}

function Copy({
  isButton,
  className,
  textToClickBoard,
  onAfterClickBoard,
}: IProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onClick = (e: any) => {
    e.stopPropagation();

    copyService.onCopy(
      textToClickBoard,
      () => {
        setSuccess(true);
        onAfterClickBoard && onAfterClickBoard();
      },
      () => setError(true)
    );
  };

  return (
    <>
      {isButton ? (
        <Button size="m" before={<Icon28CopyOutline />} onClick={onClick}>
          Скопировать
        </Button>
      ) : (
        <IconButton className={className} onClick={onClick}>
          <Icon24Copy />
        </IconButton>
      )}
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
