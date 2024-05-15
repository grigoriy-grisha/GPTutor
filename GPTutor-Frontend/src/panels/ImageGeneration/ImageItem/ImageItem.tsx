import {
  Button,
  IconButton,
  Platform,
  Spacing,
  useConfigProvider,
} from "@vkontakte/vkui";
import React from "react";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import {
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
} from "@vkontakte/icons";
import { CopyText } from "$/components/CopyText";
import { downloadService } from "$/services/DownloadService";
import { GeneratedImage } from "$/entity/image/types";
import { wallService } from "$/services/WallService";
import { ImageGenerationBlock } from "$/components/ImageGenerationBlock";

interface IProps {
  resultImage: GeneratedImage;
}

function ImageItem({ resultImage }: IProps) {
  const { isWebView, platform } = useConfigProvider();

  const isEmpty = !resultImage.modelId;

  const loading = imageGeneration.loading$.get();

  return (
    <div key={resultImage.id}>
      <ImageGenerationBlock
        isEmpty={isEmpty}
        timer={imageGeneration.timer}
        widthView={imageGeneration.widthView$.get()}
        heightView={imageGeneration.heightView$.get()}
        rbg={resultImage.rbg}
        url={resultImage.url}
        loading={loading}
      />
      {resultImage.generatedSeed && (
        <>
          <Spacing size={6} />

          <CopyText text={resultImage.generatedSeed} />
        </>
      )}
      <Spacing size={8} />
      <div className={classes.buttons}>
        <Button
          size={platform !== Platform.VKCOM ? "m" : "l"}
          mode="outline"
          after={<Icon28ArrowDownToSquareOutline />}
          onClick={async () => {
            if (!isWebView) {
              const base64 = await imageGeneration.getImageBase64(
                resultImage.id
              );

              downloadService.downloadBase64(base64, `${resultImage.id}.png`);
              return;
            }
            downloadService.appDownloadLink(
              isWebView ? platform : Platform.VKCOM,
              resultImage.url
            );
          }}
          disabled={isEmpty}
        >
          Скачать
        </Button>
        <IconButton
          disabled={isEmpty}
          onClick={() => wallService.createPost(resultImage.id)}
        >
          <Icon28ShareOutline />
        </IconButton>
      </div>
    </div>
  );
}

export default ImageItem;
