import React, { useState } from "react";
import { Platform, Tooltip, useAppearance, usePlatform } from "@vkontakte/vkui";

import { OutsideAlerter } from "$/components/OutsideAlerter";

interface IProps {
  text: string;
  children: React.ReactNode;
}

function AppTextTooltip({ text, children }: IProps) {
  const platform = usePlatform();

  const appearance = useAppearance();
  const [shown, setShown] = useState(false);

  if (platform === Platform.VKCOM) {
    return (
      <Tooltip
        placement="top-end"
        style={{ maxWidth: 350 }}
        appearance={appearance === "light" ? "accent" : "white"}
        text={text}
      >
        <div>{children}</div>
      </Tooltip>
    );
  }

  return (
    <OutsideAlerter handleOutside={() => setShown(false)}>
      {() => (
        <Tooltip
          shown={shown}
          style={{ maxWidth: 200 }}
          appearance={appearance === "light" ? "accent" : "white"}
          text={text}
        >
          <div
            onClick={() => {
              setShown(!shown);
            }}
          >
            {children}
          </div>
        </Tooltip>
      )}
    </OutsideAlerter>
  );
}

export default AppTextTooltip;
