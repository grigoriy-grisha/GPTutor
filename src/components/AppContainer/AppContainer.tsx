import React, { useState } from "react";
import { classNames } from "@vkontakte/vkui";

import TabbarApp from "$/TabbarApp";

import classes from "./AppContainer.module.css";

interface IProps {
  withoutTabbar?: boolean;
  className?: string;
  containerRef?: React.LegacyRef<HTMLDivElement>;
  children?: React.ReactNode;
  headerChildren: React.ReactNode;
  style?: React.CSSProperties;
  maxHeight?: boolean;
  isSecondary?: boolean;
  childrenWithHeight?: (height: string) => JSX.Element;
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
  childrenWithHeight,
}: IProps) {
  const [headerElem, setHeaderElem] = useState<HTMLDivElement>();
  const [tabbarElem, setTabbarElem] = useState<HTMLDivElement>();

  const offsetHeightHeader = headerElem?.offsetHeight || 0;
  const offsetHeightTabbar = tabbarElem?.offsetHeight || 0;

  const height = `calc(100vh - ${offsetHeightHeader + offsetHeightTabbar}px)`;

  return (
    <>
      STAGE
      {headerChildren && <div ref={setHeaderElem as any}>{headerChildren}</div>}
      <div
        ref={containerRef}
        className={classNames(classes.container, className, {
          [classes.secondary]: isSecondary,
        })}
        style={{
          marginBottom: `${offsetHeightTabbar}px`,
          minHeight: height,
          height: "100%",
          ...(maxHeight ? { maxHeight: height } : {}),
          ...style,
        }}
      >
        {childrenWithHeight ? childrenWithHeight(height) : children}
      </div>
      {!withoutTabbar && <TabbarApp setRef={setTabbarElem} />}
    </>
  );
}

export default AppContainer;
