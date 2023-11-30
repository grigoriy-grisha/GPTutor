import React from "react";

import {
  Button,
  ButtonGroup,
  classNames,
  Headline,
  IconButton,
  Platform,
  Tappable,
  useConfigProvider,
} from "@vkontakte/vkui";

import { imageService } from "$/services/ImageService";
import classes from "$/panels/Gallery/Gallery.module.css";
import { getModelByValue } from "$/entity/image/styles";
import {
  Icon24RepeatOutline,
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
} from "@vkontakte/icons";
import { imageGeneration } from "$/entity/image";
import { wallService } from "$/services/WallService";
import { downloadService } from "$/services/DownloadService";
import AppBanner from "$/components/AppBanner";
import { ImageHistoryItem } from "$/entity/image/ImageHistoryItem";
import { useNavigationContext } from "$/NavigationContext";
import { CopyText } from "$/components/CopyText";
import { useGenerateImage } from "$/hooks/useGenerateImage";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";

interface IProps {
  image: ImageHistoryItem;
}

function ImageItem({ image }: IProps) {
  const { isWebView, platform } = useConfigProvider();
  const { goToGenerationImages, goToGenerationImagesResult } =
    useNavigationContext();
  const generateImage = useGenerateImage();

  return (
    <AppBanner
      before={
        <Tappable
          hoverMode="opacity"
          activeMode="opacity"
          onClick={() => imageService.openImages([image.item.url])}
        >
          <div
            className={classNames(classes.image, {
              [classes.imageMobile]: platform !== Platform.VKCOM,
            })}
            style={{
              width: 150,
              height: 150 * (image.item.height / image.item.width),
              background: `rgb(${image.item.rbg})`,
            }}
          >
            <LazyLoadImage
              effect="black-and-white"
              className={classNames(classes.image, {
                [classes.imageMobile]: platform !== Platform.VKCOM,
              })}
              style={{
                width: 150,
                height: 150 * (image.item.height / image.item.width),
              }}
              src={image.item.url}
            />
          </div>
        </Tappable>
      }
      key={image.item.url}
      header={getModelByValue(image.item.modelId)?.label || image.item.modelId}
      subheader={
        <div className={classes.subHeader}>
          {image.item.loraModel && (
            <div>
              Lora model:{" "}
              <Headline style={{ display: "inline" }} level="2" weight="1">
                {image.item.loraModel}
              </Headline>
            </div>
          )}
          <div>{image.item.originalPrompt}</div>
          <div>
            Создано:{" "}
            <Headline style={{ display: "inline" }} level="2" weight="1">
              {new Date(image.item.createdAt).toLocaleString()}
            </Headline>
          </div>

          <div>
            <Headline style={{ display: "inline" }} level="2" weight="1">
              {image.item.generatedSeed && (
                <CopyText text={image.item.generatedSeed} />
              )}
            </Headline>
          </div>
        </div>
      }
      actions={
        <div className={classes.buttons}>
          <ButtonGroup style={{ alignItems: "center" }} mode="horizontal">
            <Button
              size="m"
              after={<Icon24RepeatOutline />}
              onClick={() => {
                imageGeneration.applyExample(image.item);

                platform === Platform.VKCOM
                  ? goToGenerationImages()
                  : goToGenerationImagesResult();

                generateImage();
              }}
            >
              Повторить
            </Button>
            <IconButton onClick={() => wallService.createPost(image.item.id)}>
              <Icon28ShareOutline />
            </IconButton>
          </ButtonGroup>
          <div className={classes.additionButtons}>
            <IconButton
              onClick={async () => {
                if (!isWebView) {
                  const base64 = await imageGeneration.getImageBase64(
                    image.item.id
                  );

                  console.log(base64);

                  downloadService.downloadBase64(
                    base64,
                    `${image.item.id}.png`
                  );
                  return;
                }
                downloadService.appDownloadLink(
                  isWebView ? platform : Platform.VKCOM,
                  image.item.url
                );
              }}
            >
              <Icon28ArrowDownToSquareOutline />
            </IconButton>
          </div>
        </div>
      }
    />
  );
}

export default ImageItem;
