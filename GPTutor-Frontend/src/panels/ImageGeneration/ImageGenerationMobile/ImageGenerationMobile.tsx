import React, { useEffect } from "react";
import { Button, Div, IconButton, Spacing } from "@vkontakte/vkui";
import {
  Icon28HelpCircleOutline,
  Icon28ServicesOutline,
  Icon32StarsOutline,
} from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { RequestParameters } from "$/panels/ImageGeneration/RequestParameters";
import { AdvancedSettings } from "$/panels/ImageGeneration/AdvancedSettings";
import { MainControls } from "$/panels/ImageGeneration/ImageGenerationMobile/MainControls";

import classes from "./ImageGenerationMobile.module.css";
import { ImageStyles } from "$/panels/ImageGeneration/ImageStyles";
import { HelpBlock } from "$/panels/ImageGeneration/HelpBlock";

function ImageGenerationMobile() {
  const {
    goToGenerationImagesResult,
    goToGenerationImagesExamples,
    openApplicationInfoStableArt,
  } = useNavigationContext();

  useEffect(() => {
    imageGeneration.imageSize.set(imageGeneration.aspectRatio$.get());
  }, [imageGeneration.result$.get()]);

  const showReturnToResult =
    !imageGeneration.resultIsEmpty$.get() || imageGeneration.loading$.get();

  return (
    <AppContainer
      headerChildren={
        <AppPanelHeader
          before={
            <IconButton
              onClick={openApplicationInfoStableArt}
              className={classes.buttonService}
            >
              <Icon28ServicesOutline className={classes.iconService} />
            </IconButton>
          }
          after={
            <div style={{ display: "flex" }}>
              <IconButton
                target="_blank"
                href="https://vk.com/@gptutor-primer-sozdaniya-kachestvennogo-zaprosa"
                className={classes.buttonService}
              >
                <Icon28HelpCircleOutline className={classes.iconService} />
              </IconButton>
              <IconButton onClick={goToGenerationImagesExamples}>
                <Icon32StarsOutline width={28} height={28} />
              </IconButton>
            </div>
          }
        >
          Stable Art
        </AppPanelHeader>
      }
      fixedBottomContent={
        showReturnToResult ? (
          <Div>
            <Button
              style={{ width: "100%" }}
              size="m"
              align="center"
              mode="outline"
              onClick={goToGenerationImagesResult}
            >
              Вернуться к результату
            </Button>
          </Div>
        ) : null
      }
    >
      <Div className={classes.container}>
        <HelpBlock />
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
