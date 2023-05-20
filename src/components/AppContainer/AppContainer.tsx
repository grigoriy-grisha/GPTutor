import React, { useState } from "react";

import classes from "./AppContainer.module.css";
import TabbarApp from "$/TabbarApp";

interface IProps {
  withoutTabbar?: boolean;
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
  withoutTabbar,
  containerRef,
  children,
  headerChildren,
  style,
  maxHeight,
  isSecondary,
}: IProps) {
  const [headerElem, setHeaderElem] = useState<HTMLDivElement>();
  const [tabbarElem, setTabbarElem] = useState<HTMLDivElement>();

  const offsetHeightHeader = headerElem?.offsetHeight || 0;
  const offsetHeightTabbar = tabbarElem?.offsetHeight || 0;

  const height = `calc(100vh - ${offsetHeightHeader}px)`;

  return (
    <>
      {headerChildren && <div ref={setHeaderElem as any}>{headerChildren}</div>}
      <div
        ref={containerRef}
        className={`${classes.container} ${
          isSecondary ? classes.secondary : ""
        } ${className}`}
        style={{
          paddingBottom: `${offsetHeightTabbar}px`,
          minHeight: height,
          height: "100%",
          ...(maxHeight ? { maxHeight: height } : {}),
          ...style,
        }}
      >
        {children}
      </div>
      {!withoutTabbar && <TabbarApp setRef={setTabbarElem} />}
    </>
  );
}

export default AppContainer;
