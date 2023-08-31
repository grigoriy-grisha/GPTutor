import React, { useCallback, useEffect } from "react";
import { useReactiveState } from "dignals-react";
import { Snackbar } from "@vkontakte/vkui";
import { Icon28CancelOutline, Icon28DoneOutline } from "@vkontakte/icons";

import { SnackbarNotify, snackbarNotify } from "$/entity/notify";
import useDebounce from "$/hooks/useDebounce";

import classes from "./SnackbarNotifier.module.css";

function SnackbarNotifier() {
  const snackBars$ = useReactiveState<SnackbarNotify[]>([]);

  const addSnackbar = useCallback(
    useDebounce((alert: SnackbarNotify) => {
      if (snackBars$.get().length > 0) return;
      snackBars$.set([alert]);
    }),
    []
  );

  useEffect(() => {
    snackbarNotify.on(addSnackbar);
    return () => snackbarNotify.off(addSnackbar);
  }, []);

  return (
    <>
      {snackBars$.get().map((snackBar, index) => (
        <Snackbar
          key={index}
          duration={snackBar.delay || 1000}
          onClose={() => snackBars$.set([])}
          before={
            snackBar.type === "success" ? (
              <Icon28DoneOutline className={classes.doneIcon} />
            ) : (
              <Icon28CancelOutline className={classes.doneIcon} />
            )
          }
        >
          {snackBar.message}
        </Snackbar>
      ))}
    </>
  );
}

export default SnackbarNotifier;
