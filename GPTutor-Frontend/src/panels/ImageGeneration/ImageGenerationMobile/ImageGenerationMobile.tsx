import React, { useEffect } from "react";
import {
  Button,
  Div,
  IconButton,
  Spacing,
  useConfigProvider,
} from "@vkontakte/vkui";
import { Icon32StarsOutline } from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { RequestParameters } from "$/panels/ImageGeneration/RequestParameters";
import { AdvancedSettings } from "$/panels/ImageGeneration/AdvancedSettings";
import { MainControls } from "$/panels/ImageGeneration/ImageGenerationMobile/MainControls";

import classes from "./ImageGenerationMobile.module.css";
import { ImageStyles } from "$/panels/ImageGeneration/ImageStyles";

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
        !imageGeneration.resultIsEmpty$.get() ? (
          <Div>
            <Button
              style={{ width: "100%" }}
              size="m"
              align="center"
              mode="primary"
              onClick={goToGenerationImagesResult}
            >
              Вернуться к результату
            </Button>
          </Div>
        ) : null
      }
    >
      <Div className={classes.container}>
        <MainControls />
        <Spacing size={8} />
        <ImageStyles />
        <Spacing size={8} />
        <RequestParameters />
        <Spacing size={8} />
        <AdvancedSettings />
      </Div>
    </AppContainer>
  );
}

export default ImageGenerationMobile;
