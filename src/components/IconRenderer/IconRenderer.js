import { useAdaptivityConditionalRender } from "@vkontakte/vkui";
import React from "react";

function IconRenderer({ IconCompact, IconRegular }) {
  const { sizeY } = useAdaptivityConditionalRender();

  return (
    <React.Fragment>
      {sizeY.compact && <IconCompact className={sizeY.compact.className} />}
      {sizeY.regular && <IconRegular className={sizeY.regular.className} />}
    </React.Fragment>
  );
}

export default IconRenderer;
