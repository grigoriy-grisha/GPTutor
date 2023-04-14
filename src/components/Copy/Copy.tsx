import React, { memo } from "react";

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
  function copyToClickBoard(text: string) {
    copyService.copyToClickBoard$.run(text).then(() => {
      onAfterClickBoard?.();
    });
  }

  const onClick = () => copyToClickBoard(textToClickBoard);

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
      {copyService.copyToClickBoard$.done.get() && (
        <InPortal id="root">
          <Snackbar
            onClose={() => copyService.copyToClickBoard$.reset()}
            before={
              copyService.copyToClickBoard$.success.get() ? (
                <Icon28DoneOutline className={classes.doneIcon} />
              ) : (
                <Icon28CancelOutline className={classes.doneIcon} />
              )
            }
          >
            {copyService.copyToClickBoard$.success.get()
              ? "Скопировано"
              : "Не удалось скопировать"}
          </Snackbar>
        </InPortal>
      )}
    </>
  );
}

export default memo(Copy);
