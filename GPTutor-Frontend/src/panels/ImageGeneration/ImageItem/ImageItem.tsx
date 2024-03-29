import {
  Button,
  classNames,
  IconButton,
  Platform,
  Spacing,
  Tappable,
  useConfigProvider,
} from "@vkontakte/vkui";
import React from "react";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import TimeLoading from "../../../components/TimeLoading/TimeLoading";
import { imageGeneration } from "$/entity/image";
import {
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
  Icon48PictureOutline,
} from "@vkontakte/icons";
import { imageService } from "$/services/ImageService";
import { CopyText } from "$/components/CopyText";
import { downloadService } from "$/services/DownloadService";
import { GeneratedImage } from "$/entity/image/types";
import { wallService } from "$/services/WallService";

interface IProps {
  resultImage: GeneratedImage;
}

function ImageItem({ resultImage }: IProps) {
  const { isWebView, platform } = useConfigProvider();

  const isEmpty = !resultImage.modelId;

  const aspectRatioPadding =
    (imageGeneration.heightView$.get() / imageGeneration.widthView$.get()) *
    100;

  const loading = imageGeneration.loading$.get();

  return (
    <div key={resultImage.id}>
      {isEmpty ? (
        <div
          style={{ paddingBottom: `${aspectRatioPadding}%` }}
          className={classNames(classes.image)}
        >
          <div className={classes.imagePlaceholder}>
            {loading ? (
              <TimeLoading timer={imageGeneration.timer} />
            ) : (
              <Icon48PictureOutline width={86} height={86} />
            )}
          </div>
        </div>
      ) : (
        <Tappable
          hoverMode="opacity"
          activeMode="opacity"
          onClick={() => imageService.openImages([resultImage.url])}
        >
          <div
            style={{
              paddingBottom: `${aspectRatioPadding}%`,
              ...(resultImage.url
                ? { background: `rgb(${resultImage.rbg})` }
                : {}),
            }}
            className={classNames(classes.image)}
          >
            {
              <img
                className={classNames(classes.image, classes.generatedImage)}
                src={resultImage.url}
                alt="Картинка"
              />
            }
          </div>
        </Tappable>
      )}

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

              console.log(base64);

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
