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
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import classes from "$/panels/DetailImage/DetailImage.module.css";
import { imageService } from "$/services/ImageService";
import {
  Icon24MagicWandOutline,
  Icon28ArrowDownToSquareOutline,
} from "@vkontakte/icons";
import { imageGeneration } from "$/entity/image";
import { downloadService } from "$/services/DownloadService";
import { Copy } from "$/components/Copy";
import { imagesFeed } from "$/entity/image/imagesFeed";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { AppContainer } from "$/components/AppContainer";

function DetailImageDesktop() {
  const image = imagesFeed.currentImage$.get()?.image$.get();
  const { isWebView, platform } = useConfigProvider();
  const { goBack, goToGenerationImages, goToGenerationImagesResult } =
    useNavigationContext();

  if (!image) return null;

  return (
    <AppContainer
      headerChildren={
        <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
          Детальная
        </AppPanelHeader>
      }
    >
      <Div className={classes.container}>
        <Card mode="shadow">
          <Div>
            <Tappable
              hoverMode="opacity"
              activeMode="opacity"
              onClick={() => imageService.openImages([image.url])}
            >
              <LazyLoadImage
                className={classes.image}
                effect="black-and-white"
                src={image.url}
              />
            </Tappable>
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
          <Card mode="shadow">
            <Div style={{ paddingTop: 2 }}>
              <div className={classes.header}>
                <Title level="2" className={classes.headerText}>
                  Запрос
                </Title>
                <Copy textToClickBoard={image.originalPrompt} />
              </div>

              <Text weight="2">{image.originalPrompt}</Text>
            </Div>
          </Card>
          <Spacing size={12} />
          <Card mode="shadow">
            <Div>
              <div className={classes.containerInfo}>
                <InfoRow header="Модель">{image?.modelId}</InfoRow>
                <InfoRow header="CFG Scale">{image?.guidanceScale}</InfoRow>
                <InfoRow header="Сид">{image?.seed}</InfoRow>
              </div>
              <Spacing size={16} />
              <div className={classes.containerInfo}>
                <InfoRow header="Шаги">{image?.numInferenceSteps}</InfoRow>
                <InfoRow header="Cэмлпер">{image?.scheduler}</InfoRow>
                <InfoRow header="Ширина/Высота">{`${image?.width}/${image?.height}`}</InfoRow>
              </div>
            </Div>
          </Card>
          <Spacing size={12} />
          <Button
            size="m"
            style={{ width: "100%" }}
            after={<Icon24MagicWandOutline />}
            onClick={() => {
              imageGeneration.applyExample(image);
              imageGeneration.generateImage();

              platform === Platform.VKCOM
                ? goToGenerationImages()
                : goToGenerationImagesResult();
            }}
          >
            Попробовать
          </Button>
        </div>
      </Div>
    </AppContainer>
  );
}

export default DetailImageDesktop;
