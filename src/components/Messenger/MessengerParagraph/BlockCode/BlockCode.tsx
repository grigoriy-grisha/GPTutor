import React, { memo, useLayoutEffect } from "react";

import { InPortal } from "../../../InPortal";
import { Copy } from "../../../Copy";

import classes from "./BlockCode.module.css";

interface IProps {
  elem?: HTMLElement;
}
function BlockCode({ elem }: IProps) {
  let textToClickBoard = "";

  const iterator = document.createNodeIterator(
    elem!.querySelector("pre")!,
    NodeFilter.SHOW_TEXT
  );

  let textNode;
  while ((textNode = iterator.nextNode())) {
    textToClickBoard += textNode.textContent;
  }

  useLayoutEffect(() => {
    const copyMock = elem?.querySelector("[data-copy-mock]");
    if (copyMock) elem?.removeChild(copyMock);
  }, []);

  return (
    <InPortal elem={elem}>
      <span className={classes.additional} onClick={(e) => e.stopPropagation()}>
        <div className={classes.codeInfo}>
          <Copy
            copyText="Скопировать код"
            mode="secondary"
            isButton
            textToClickBoard={textToClickBoard}
          />
        </div>
      </span>
    </InPortal>
  );
}

export default memo(BlockCode);
