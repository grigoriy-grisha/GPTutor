import React from "react";
import { classNames } from "@vkontakte/vkui";

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
      className={classNames(classes.container, className, {
        [classes.containerTop]: isTop,
        [classes.containerBottom]: isBottom,
      })}
    >
      {children}
    </div>
  );
}

export default CardBlock;
