import React, { forwardRef } from "react";

import { Div } from "@vkontakte/vkui";

import classes from "./MessengerContainer.module.css";

interface IProps {
  children: React.ReactNode;
  withoutDiv?: boolean;
}

function MessengerContainer({ children, withoutDiv }: IProps, ref: any) {
  if (withoutDiv) {
    return (
      <div ref={ref} className={classes.mainScroll}>
        <div className={classes.midContainer}>
          <div className={classes.insideContainer}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={classes.mainScroll}>
      <Div className={classes.midContainer}>
        <div className={classes.insideContainer}>{children}</div>
      </Div>
    </div>
  );
}

export default forwardRef(MessengerContainer);
