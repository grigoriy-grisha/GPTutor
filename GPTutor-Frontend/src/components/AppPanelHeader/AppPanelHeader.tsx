import React from "react";
import {
  classNames,
  PanelHeader,
  Platform,
  Separator,
  usePlatform,
} from "@vkontakte/vkui";

import classes from "./AppPanelHeader.module.css";

interface IProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function AppPanelHeader({ after, before, className, children }: IProps) {
  const platform = usePlatform();

  return (
    <>
      <PanelHeader
        className={classNames(classes.panelHeader, className, {
          [classes.panelHeaderVkApps]: platform === Platform.VKCOM,
        })}
        before={before}
      >
        <div className={classes.wrapper}>
          {children}
          <span className={classes.after}>{after}</span>
        </div>
      </PanelHeader>
      <Separator wide />
    </>
  );
}

export default AppPanelHeader;
