import React, { memo } from "react";

import { Snackbar } from "@vkontakte/vkui";
import { Icon28CancelOutline, Icon28DoneOutline } from "@vkontakte/icons";

import { CopyService } from "$/services/CopyService";
import { InPortal } from "$/components/InPortal";

import classes from "./CopySnackBar.module.css";

interface IProps {
  copyService: CopyService;
}

function CopySnackBar({ copyService }: IProps) {
  if (copyService.copyToClickBoard$.done.get()) return null;

  return (
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
  );
}

export default memo(CopySnackBar);
