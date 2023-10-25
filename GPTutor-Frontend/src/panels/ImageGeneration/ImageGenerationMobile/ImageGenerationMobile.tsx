import React, { useEffect } from "react";
import {
  Button,
  Div,
  IconButton,
  Spacing,
  useConfigProvider,
} from "@vkontakte/vkui";
import {
  Icon20SunOutline,
  Icon28ServicesOutline,
  Icon32StarsOutline,
} from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Attempts } from "$/panels/ImageGeneration/Attempts";
import { RequestParameters } from "$/panels/ImageGeneration/RequestParameters";
import { AdvancedSettings } from "$/panels/ImageGeneration/AdvancedSettings";
import { MainControls } from "$/panels/ImageGeneration/ImageGenerationMobile/MainControls";

import classes from "./ImageGenerationMobile.module.css";

function ImageGenerationMobile() {
  const { goToGenerationImagesResult, goToGenerationImagesExamples } =
    useNavigationContext();
  const { appearance } = useConfigProvider();
  const generateImage = imageGeneration.generateImage$;

  useEffect(() => {
    imageGeneration.imageSize.set(imageGeneration.aspectRatio$.get());
  }, [imageGeneration.result$.get()]);

  return (
    <AppContainer
      headerChildren={
        <AppPanelHeader
          before={
            <IconButton>
              <Icon28ServicesOutline />
            </IconButton>
          }
          after={
            <IconButton onClick={goToGenerationImagesExamples}>
              <Icon32StarsOutline width={28} height={28} />
            </IconButton>
          }
        >
          Stable Art
        </AppPanelHeader>
      }
      fixedBottomContent={
        <Div>
          <Button
            disabled={imageGeneration.prompt$.get().trim() === ""}
            style={{ width: "100%" }}
            loading={generateImage.loading.get()}
            size="m"
            align="center"
            mode="primary"
            onClick={() => {
              imageGeneration.generate();
              goToGenerationImagesResult();
            }}
          >
            Сгенерировать
          </Button>
        </Div>
      }
    >
      <Div className={classes.container}>
        <Attempts />

        <Spacing size={8} />
        <MainControls />

        <Spacing size={8} />
        <RequestParameters />
        <Spacing size={8} />
        <AdvancedSettings />
      </Div>
    </AppContainer>
  );
}

export default ImageGenerationMobile;
