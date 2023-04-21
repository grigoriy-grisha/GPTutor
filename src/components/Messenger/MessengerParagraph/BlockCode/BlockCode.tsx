import React, { memo } from "react";

import { InPortal } from "../../../InPortal";
import { Copy } from "../../../Copy";

import classes from "./BlockCode.module.css";

interface IProps {
  elem?: HTMLElement;
}
function BlockCode({ elem }: IProps) {
  let textToClickBoard = "";

  const iterator = document.createNodeIterator(elem!, NodeFilter.SHOW_TEXT);

  let textNode;
  while ((textNode = iterator.nextNode())) {
    textToClickBoard += textNode.textContent;
  }

  return (
    <InPortal elem={elem}>
      <span className={classes.additional} onClick={(e) => e.stopPropagation()}>
        <Copy textToClickBoard={textToClickBoard} />
      </span>
    </InPortal>
  );
}

export default memo(BlockCode);
