import React, { useEffect } from "react";

import {
  Accordion,
  Caption,
  classNames,
  Div,
  IconButton,
  Separator,
  Spacing,
  Title,
  Image,
  HorizontalScroll,
  HorizontalCell,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import {
  Icon28CheckCircleOn,
  Icon28ServicesOutline,
  Icon32StarsOutline,
} from "@vkontakte/icons";
import { useNavigationContext } from "$/NavigationContext";
import { ImageGenerationDesktopResult } from "$/panels/ImageGeneration/ImageGenerationDesktopResult";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Attempts } from "$/panels/ImageGeneration/Attempts";
import { RequestParameters } from "$/panels/ImageGeneration/RequestParameters";
import { AdvancedSettings } from "$/panels/ImageGeneration/AdvancedSettings";
import { MainControls } from "$/panels/ImageGeneration/ImageGenerationDesktop/MainControls";
import { AppDiv } from "$/components/AppDiv";
import { styles } from "$/entity/image/styles";
import { ImageStyles } from "$/panels/ImageGeneration/ImageStyles";

function ImageGenerationDesktop() {
  const { goToGenerationImagesExamples, goToGenerationImagesPrompts } =
    useNavigationContext();

  useEffect(() => {
    if (imageGeneration.resultIsEmpty$.get()) {
      imageGeneration.imageSize.set(imageGeneration.aspectRatio$.get());
      imageGeneration.widthView$.set(imageGeneration.width$.get());
      imageGeneration.heightView$.set(imageGeneration.height$.get());
    }
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
          <Title style={{ marginLeft: 12 }} level="2">
            Stable Art
          </Title>
        </AppPanelHeader>
      }
    >
      <Div className={classes.container}>
        <div>
          <Attempts />

          <Spacing size={8} />
          <MainControls />
          <Spacing size={8} />
          <ImageStyles />
          <Spacing size={8} />
          <RequestParameters />
          <Spacing size={8} />
          <AdvancedSettings />
        </div>

        <ImageGenerationDesktopResult />
      </Div>
    </AppContainer>
  );
}

export default ImageGenerationDesktop;
