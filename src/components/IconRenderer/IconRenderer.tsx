import { useAdaptivityConditionalRender } from "@vkontakte/vkui";
import React from "react";

interface IProps {
  IconCompact: any;
  IconRegular: any;
}

function IconRenderer({ IconCompact, IconRegular }: IProps) {
  const { sizeY } = useAdaptivityConditionalRender();

  return (
    <React.Fragment>
      {sizeY.compact && <IconCompact className={sizeY.compact.className} />}
      {sizeY.regular && <IconRegular className={sizeY.regular.className} />}
    </React.Fragment>
  );
}

export default IconRenderer;
