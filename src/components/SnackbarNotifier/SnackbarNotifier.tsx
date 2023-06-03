import React, { useEffect } from "react";
import { useReactiveState } from "dignals-react";
import { Snackbar } from "@vkontakte/vkui";
import { Icon28CancelOutline, Icon28DoneOutline } from "@vkontakte/icons";

import { SnackbarNotify, snackbarNotify } from "$/entity/notify";
import { InPortal } from "$/components/InPortal";

import classes from "./SnackbarNotifier.module.css";

function SnackbarNotifier() {
  const snackBars$ = useReactiveState<SnackbarNotify[]>([]);

  useEffect(() => {
    const listenSnackbar = (alert: SnackbarNotify) => {
      snackBars$.set([...snackBars$.get(), alert]);
    };

    snackbarNotify.on(listenSnackbar);
    return () => snackbarNotify.off(listenSnackbar);
  }, []);

  return (
    <InPortal id="root">
      {snackBars$.get().map((snackBar, index) => (
        <Snackbar
          key={index}
          duration={1000}
          onClose={() => {
            snackBars$.set(
              snackBars$.get().filter((item) => item !== snackBar)
            );
          }}
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
    </InPortal>
  );
}

export default SnackbarNotifier;
