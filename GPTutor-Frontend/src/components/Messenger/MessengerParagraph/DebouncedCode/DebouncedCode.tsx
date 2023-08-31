import React, { RefObject } from "react";

import { useDebounceValue } from "$/hooks/useDebounceValue";

import { BlockCode } from "./BlockCode";

interface IProps {
  containerRef: RefObject<HTMLElement>;
  html: string;
}
function DebouncedCode({ containerRef, html }: IProps) {
  return (
    <>
      {useDebounceValue<JSX.Element[]>(
        [],
        () => {
          const pres = containerRef.current!.querySelectorAll(
            "[data-pre-container]"
          );

          return [...pres].map((pre, index) => (
            <BlockCode elem={pre as HTMLElement} key={index} />
          ));
        },
        [html],
        200
      )}
    </>
  );
}

export default DebouncedCode;
