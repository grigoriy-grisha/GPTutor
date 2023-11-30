import classes from "$/panels/DetailImage/DetailImage.module.css";
import {
  Button,
  Card,
  Div,
  InfoRow,
  PanelHeaderBack,
  Platform,
  Spacing,
  Tappable,
  Text,
  Title,
  useConfigProvider,
} from "@vkontakte/vkui";
import { imageService } from "$/services/ImageService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Icon24MagicWandOutline,
  Icon28ArrowDownToSquareOutline,
} from "@vkontakte/icons";
import { imageGeneration } from "$/entity/image";
import { downloadService } from "$/services/DownloadService";
import { Copy } from "$/components/Copy";
import React from "react";
import { imagesFeed } from "$/entity/image/imagesFeed";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { AppContainer } from "$/components/AppContainer";
import { AutoSizer } from "react-virtualized";
import { useGenerateImage } from "$/hooks/useGenerateImage";

function DetailImageMobile() {
  const image = imagesFeed.currentImage$.get()?.image$.get();
  const { isWebView, platform } = useConfigProvider();
  const { goBack, goToGenerationImages, goToGenerationImagesResult } =
    useNavigationContext();

  const generateImage = useGenerateImage();

  if (!image) return null;

  const aspectRatioPadding = image.height / image.width;

  return (
    <AppContainer
      headerChildren={
        <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
          Детальная
        </AppPanelHeader>
      }
      fixedBottomContent={
        <Div>
          <Button
            size="m"
            style={{ width: "100%" }}
            after={<Icon24MagicWandOutline />}
            onClick={() => {
              imageGeneration.applyExample(image);

              platform === Platform.VKCOM
                ? goToGenerationImages()
                : goToGenerationImagesResult();

              generateImage();
            }}
          >
            Попробовать
          </Button>
        </Div>
      }
    >
      <Div>
        <Card mode="shadow">
          <Div>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-ignore*/}
            <AutoSizer style={{ width: "100%", height: "100%" }}>
              {({ width }) => (
                <Tappable
                  className={classes.tappable}
                  hoverMode="opacity"
                  activeMode="opacity"
                  onClick={() => imageService.openImages([image.url])}
                >
                  <LazyLoadImage
                    style={{ width, height: width * aspectRatioPadding }}
                    className={classes.image}
                    effect="black-and-white"
                    src={image.url}
                  />
                </Tappable>
              )}
            </AutoSizer>
            <Spacing size={8} />
            <Button
              style={{ width: "100%" }}
              size={platform !== Platform.VKCOM ? "m" : "l"}
              mode="outline"
              after={<Icon28ArrowDownToSquareOutline />}
              onClick={async () => {
                if (!isWebView) {
                  const base64 = await imageGeneration.getImageBase64(image.id);

                  downloadService.downloadBase64(base64, `${image.id}.png`);
                  return;
                }

                downloadService.appDownloadLink(
                  isWebView ? platform : Platform.VKCOM,
                  image.url
                );
              }}
            >
              Скачать
            </Button>
          </Div>
        </Card>
        <div>
          <Spacing size={12} />
          <Card mode="shadow">
            <Div style={{ paddingTop: 2 }}>
              <div className={classes.header}>
                <Title level="2" className={classes.headerText}>
                  Запрос
                </Title>
                <Copy
                  className={classes.copy}
                  textToClickBoard={image.originalPrompt}
                />
              </div>

              <Text weight="2">{image.originalPrompt}</Text>
            </Div>
          </Card>
          <Spacing size={12} />
          <Card mode="shadow">
            <Div>
              <div className={classes.containerInfoMobile}>
                <InfoRow header="Модель">{image?.modelId}</InfoRow>
                <InfoRow header="CFG Scale">{image?.guidanceScale}</InfoRow>
              </div>
              <Spacing size={16} />
              <div className={classes.containerInfoMobile}>
                <InfoRow header="Шаги">{image?.numInferenceSteps}</InfoRow>
                <InfoRow header="Cэмлпер">{image?.scheduler}</InfoRow>
              </div>
              <Spacing size={16} />
              <div className={classes.containerInfoMobile}>
                <InfoRow header="Сид">{image?.seed}</InfoRow>
                <InfoRow header="Ширина/Высота">{`${image?.width}/${image?.height}`}</InfoRow>
              </div>
              {image?.loraModel && (
                <>
                  <Spacing size={16} />
                  <div className={classes.containerInfoMobile}>
                    <InfoRow header="Lora Model">{image?.loraModel}</InfoRow>
                  </div>
                </>
              )}
            </Div>
          </Card>
          <Spacing size={12} />
        </div>
      </Div>
    </AppContainer>
  );
}

export default DetailImageMobile;
