import React, { forwardRef } from "react";

import { Div } from "@vkontakte/vkui";

import classes from "./MessengerContainer.module.css";

interface IProps {
  children: React.ReactNode;
}

function MessengerContainer({ children }: IProps, ref: any) {
  return (
    <div ref={ref} className={classes.mainScroll}>
      <Div className={classes.midContainer}>
        <div className={classes.insideContainer}>{children}</div>
      </Div>
    </div>
  );
}

export default forwardRef(MessengerContainer);
