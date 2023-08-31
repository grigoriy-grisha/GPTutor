import React, { PropsWithChildren } from "react";
import { Div, Title } from "@vkontakte/vkui";

function TertiaryTitle({ children }: PropsWithChildren<any>) {
  return (
    <Div>
      <Title level="3" style={{ color: "var(--vkui--color_text_secondary)" }}>
        {children}
      </Title>
    </Div>
  );
}

export default TertiaryTitle;
