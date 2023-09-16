import React, { useEffect } from "react";
import {
  Panel,
  Platform,
  useConfigProvider,
  usePlatform,
} from "@vkontakte/vkui";
import ImageGenerationDesktop from "./ImageGenerationDesktop";
import { imageGeneration } from "$/entity/imageGeneration";
import ImageGenerationMobile from "./ImageGenerationMobile";

interface IProps {
  id: string;
}

function ImageGeneration({ id }: IProps) {
  const platform = usePlatform();

  return (
    <Panel id={id}>
      {platform === Platform.VKCOM ? (
        <ImageGenerationDesktop />
      ) : (
        <ImageGenerationMobile />
      )}
    </Panel>
  );
}

export default ImageGeneration;
