import React from "react";
import {
  classNames,
  PanelHeader,
  Platform,
  usePlatform,
} from "@vkontakte/vkui";

import classes from "./AppPanelHeader.module.css";

interface IProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  children: React.ReactNode;
}

function AppPanelHeader({ after, before, children }: IProps) {
  const platform = usePlatform();

  return (
    <PanelHeader
      className={classNames(classes.panelHeader, {
        [classes.panelHeaderVkApps]: platform === Platform.VKCOM,
      })}
      before={before}
    >
      <div className={classes.wrapper}>
        {children}
        {after}
      </div>
    </PanelHeader>
  );
}

export default AppPanelHeader;
