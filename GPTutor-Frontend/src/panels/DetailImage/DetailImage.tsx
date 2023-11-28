import React from "react";
import { Panel, Platform, usePlatform } from "@vkontakte/vkui";
import { DetailImageDesktop } from "$/panels/DetailImage/DetailImageDesktop";
import DetailImageMobile from "$/panels/DetailImage/DetailImageMobile/DetailImageMobile";

interface IProps {
  id: string;
}

function DetailImage({ id }: IProps) {
  const platform = usePlatform();

  return (
    <Panel id={id}>
      {platform === Platform.VKCOM ? (
        <DetailImageDesktop />
      ) : (
        <DetailImageMobile />
      )}
    </Panel>
  );
}

export default DetailImage;
