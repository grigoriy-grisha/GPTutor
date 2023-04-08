import React, { useState } from "react";

import classes from "./AppContainer.module.css";

function AppContainer({
  containerRef,
  children,
  headerChildren,
  style,
  maxHeight,
}) {
  const [headerElem, setHeaderElem] = useState();

  const offsetHeight = headerElem?.offsetHeight || 0;
  const height = `calc(100vh - ${offsetHeight}px)`;

  return (
    <>
      {headerChildren && <div ref={setHeaderElem}>{headerChildren}</div>}
      <div
        ref={containerRef}
        className={classes.container}
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
