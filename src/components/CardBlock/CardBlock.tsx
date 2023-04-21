import React from "react";

import classes from "./CardBlock.module.css";

interface IProps {
  children: React.ReactNode;
  isTop?: boolean;
  isBottom?: boolean;
  className?: string;
}

function CardBlock({ children, isTop, isBottom, className }: IProps) {
  return (
    <div
      className={`${classes.container} ${className} ${
        isTop ? classes.containerTop : ""
      } ${isBottom ? classes.containerBottom : ""}`}
    >
      {children}
    </div>
  );
}

export default CardBlock;
