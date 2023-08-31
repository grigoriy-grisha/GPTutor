import { Div, IconButton } from "@vkontakte/vkui";
import { Icon24Cancel } from "@vkontakte/icons";
import React from "react";

import classes from "./ChatInfoBlock.module.css";

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

function ChatInfoBlock({ children, onClose }: IProps) {
  return (
    <Div>
      <div className={classes.infoWrapper}>
        <div className={classes.infoBlock}>{children}</div>
        <IconButton className={classes.cancelIcon} onClick={onClose}>
          <Icon24Cancel />
        </IconButton>
      </div>
    </Div>
  );
}

export default ChatInfoBlock;
