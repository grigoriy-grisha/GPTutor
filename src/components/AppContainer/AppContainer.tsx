import React, { useState } from "react";

import classes from "./AppContainer.module.css";

interface IProps {
  containerRef?: React.LegacyRef<HTMLDivElement>;
  children: ({ height }: { height: string }) => React.ReactNode;
  headerChildren: React.ReactNode;
  style?: React.CSSProperties;
  maxHeight?: boolean;
  isSecondary?: boolean;
}

function AppContainer({
  containerRef,
  children,
  headerChildren,
  style,
  maxHeight,
  isSecondary,
}: IProps) {
  const [headerElem, setHeaderElem] = useState<HTMLDivElement>();

  const offsetHeight = headerElem?.offsetHeight || 0;
  const height = `calc(100vh - ${offsetHeight}px)`;

  return (
    <>
      {headerChildren && <div ref={setHeaderElem as any}>{headerChildren}</div>}
      <div
        ref={containerRef}
        className={`${classes.container} ${
          isSecondary ? classes.secondary : ""
        }`}
        style={{
          minHeight: height,
          ...(maxHeight ? { maxHeight: height } : {}),
          ...style,
        }}
      >
        {children({ height })}
      </div>
    </>
  );
}

export default AppContainer;
