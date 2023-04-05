import { forwardRef } from "react";

import { Div } from "@vkontakte/vkui";

import classes from "./MessengerContainer.module.css";

function MessengerContainer({ children, offsetHeight }, ref) {
  return (
    <div ref={ref} className={classes.mainScroll}>
      <Div className={classes.midContainer}>
        <div className={classes.insideContainer}>{children}</div>
      </Div>
    </div>
  );
}

export default forwardRef(MessengerContainer);
