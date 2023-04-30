import React, { useState } from "react";

import classes from "./AppContainer.module.css";

interface IProps {
  className?: string;
  containerRef?: React.LegacyRef<HTMLDivElement>;
  children: React.ReactNode;
  headerChildren: React.ReactNode;
  style?: React.CSSProperties;
  maxHeight?: boolean;
  isSecondary?: boolean;
}

function AppContainer({
  className,
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
        } ${className}`}
        style={{
          minHeight: height,
          height: "100%",
          ...(maxHeight ? { maxHeight: height } : {}),
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
}

export default AppContainer;
