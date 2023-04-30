import React, { memo, useEffect } from "react";

import { InPortal } from "$/components/InPortal";
import { Copy } from "$/components/Copy";

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

  useEffect(() => {
    const copyMocks = elem?.querySelectorAll("[data-copy-mock]");
    const copyCodes = elem?.querySelectorAll("[data-copy-code]");

    copyMocks?.forEach((copyMock) => {
      (copyMock as HTMLElement).style.display = "none";
    });
    copyCodes?.forEach((copyMock) => {
      (copyMock as HTMLElement).style.display = "block";
    });
  });

  return (
    <InPortal elem={elem}>
      <span
        data-copy-code=""
        className={classes.additional}
        onClick={(e) => e.stopPropagation()}
      >
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
