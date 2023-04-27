import React, { memo, useMemo } from "react";

import {
  Icon20CopyOutline,
  Icon24Copy,
  Icon28CancelOutline,
  Icon28DoneOutline,
} from "@vkontakte/icons";
import { Button, IconButton, Snackbar } from "@vkontakte/vkui";
import { InPortal } from "../InPortal";
import { CopyService } from "../../services/CopyService";

import classes from "./Copy.module.css";

interface IProps {
  mode?: "primary" | "secondary" | "tertiary" | "outline" | "link";
  copyText?: string;
  isButton?: boolean;
  className?: string;
  textToClickBoard: string;
  onAfterClickBoard?: () => void;
}

function Copy({
  mode,
  copyText,
  isButton,
  className,
  textToClickBoard,
  onAfterClickBoard,
}: IProps) {
  const copyService = useMemo(() => new CopyService(), []);

  function copyToClickBoard(text: string) {
    copyService.copyToClickBoard$.run(text).then(() => {
      onAfterClickBoard?.();
    });
  }

  const onClick = () => copyToClickBoard(textToClickBoard);

  return (
    <>
      {isButton ? (
        <Button
          mode={mode}
          size="m"
          before={<Icon20CopyOutline />}
          onClick={onClick}
        >
          {copyText || "Скопировать"}
        </Button>
      ) : (
        <IconButton className={className} onClick={onClick}>
          <Icon24Copy />
        </IconButton>
      )}
      {copyService.copyToClickBoard$.done.get() && (
        <InPortal id="root">
          <Snackbar
            duration={1500}
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
