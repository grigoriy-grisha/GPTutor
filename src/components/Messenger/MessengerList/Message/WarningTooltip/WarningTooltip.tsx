import React, { memo, useState } from "react";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";
import { IconButton, useAppearance } from "@vkontakte/vkui";
import { Icon24WarningTriangleOutline } from "@vkontakte/icons";

import { OutsideAlerter } from "$/components/OutsideAlerter";

function WarningTooltip() {
  const appearance = useAppearance();
  const [shown, setShown] = useState(false);

  return (
    <OutsideAlerter handleOutside={() => setShown(false)}>
      {() => (
        <TextTooltip
          shown={shown}
          style={{ maxWidth: 200 }}
          appearance={appearance === "light" ? "accent" : "white"}
          text="Из-за большой истории диалога,
                   это сообщение не может быть учтено в локальном контексте.
                   ChatGPT может поддерживать только 1000 слов в текущем диалоге."
        >
          <IconButton onClick={() => setShown(!shown)}>
            <Icon24WarningTriangleOutline />
          </IconButton>
        </TextTooltip>
      )}
    </OutsideAlerter>
  );
}

export default memo(WarningTooltip);
