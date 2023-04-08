import { memo, useState } from "react";

import { Icon24Copy, Icon28DoneOutline } from "@vkontakte/icons";
import { IconButton, Snackbar } from "@vkontakte/vkui";

import { copyToClickBoard } from "./utils";
import { InPortal } from "../InPortal";

import classes from "./Copy.module.css";

function Copy({ className, textToClickBoard, onAfterClickBoard }) {
  const [snackbar, setSnackbar] = useState(false);
  return (
    <>
      <IconButton
        className={className}
        onClick={() => {
          copyToClickBoard(textToClickBoard);
          onAfterClickBoard && onAfterClickBoard();
          setSnackbar(true);
        }}
      >
        <Icon24Copy />
      </IconButton>
      {snackbar && (
        <InPortal id="root">
          <Snackbar
            onClose={() => setSnackbar(false)}
            onActionClick={() => setText("Добавляем метку.")}
            before={<Icon28DoneOutline className={classes.doneIcon} />}
          >
            Скопировано
          </Snackbar>
        </InPortal>
      )}
    </>
  );
}

export default memo(Copy);
