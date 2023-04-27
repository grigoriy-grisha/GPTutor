import React, { PropsWithChildren } from "react";
import { Div } from "@vkontakte/vkui";

function AppDiv({ children }: PropsWithChildren<any>) {
  return <Div style={{ paddingTop: 0, paddingBottom: 0 }}>{children}</Div>;
}

export default AppDiv;
