import React, { ReactNode } from "react";

import classes from "./Hovered.module.css";

interface IProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

function Hovered({ children, style }: IProps) {
  return (
    <div className={classes.hovered} style={style}>
      {children}
    </div>
  );
}

export default Hovered;
