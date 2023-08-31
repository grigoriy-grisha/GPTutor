import React, { PropsWithChildren } from "react";

import { Div } from "@vkontakte/vkui";

function AppDiv({
  children,
  style,
  className,
}: PropsWithChildren<{ style?: React.CSSProperties; className?: string }>) {
  return (
    <Div
      className={className}
      style={{ paddingTop: 0, paddingBottom: 0, ...style }}
    >
      {children}
    </Div>
  );
}

export default AppDiv;
