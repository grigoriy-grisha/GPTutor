import React from "react";
import { classNames, IconButton } from "@vkontakte/vkui";
import { Icon28ChevronDownOutline } from "@vkontakte/icons";

import classes from "./ScrollDown.module.css";

interface IProps {
  onClick: () => void;
  isShow: boolean;
}

function ScrollDown({ onClick, isShow }: IProps) {
  return (
    <span
      onClick={onClick}
      className={classNames(classes.wrapper, {
        [classes.wrapperActive]: isShow,
      })}
    >
      <IconButton>
        <Icon28ChevronDownOutline className={classes.chevronDown} />
      </IconButton>
    </span>
  );
}

export default ScrollDown;
