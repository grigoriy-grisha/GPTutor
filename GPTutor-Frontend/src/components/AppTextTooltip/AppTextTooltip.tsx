import React, { useState } from "react";
import { Platform, useAppearance, usePlatform } from "@vkontakte/vkui";

import { OutsideAlerter } from "$/components/OutsideAlerter";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";

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
      <TextTooltip
        placement="top-end"
        style={{ maxWidth: 350 }}
        appearance={appearance === "light" ? "accent" : "white"}
        text={text}
      >
        <div>{children}</div>
      </TextTooltip>
    );
  }

  return (
    <OutsideAlerter handleOutside={() => setShown(false)}>
      {() => (
        <TextTooltip
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
        </TextTooltip>
      )}
    </OutsideAlerter>
  );
}

export default AppTextTooltip;
