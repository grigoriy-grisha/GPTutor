import React, { useEffect } from "react";

import { Div, IconButton, Spacing, Title } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import { Icon28ServicesOutline, Icon32StarsOutline } from "@vkontakte/icons";
import { useNavigationContext } from "$/NavigationContext";
import { ImageGenerationDesktopResult } from "$/panels/ImageGeneration/ImageGenerationDesktopResult";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { RequestParameters } from "$/panels/ImageGeneration/RequestParameters";
import { AdvancedSettings } from "$/panels/ImageGeneration/AdvancedSettings";
import { MainControls } from "$/panels/ImageGeneration/ImageGenerationDesktop/MainControls";
import ImageStyles from "../ImageStyles/ImageStyles";

function ImageGenerationDesktop() {
  const { goToGenerationImagesExamples, openApplicationInfoStableArt } =
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
          before={
            <IconButton
              onClick={openApplicationInfoStableArt}
              className={classes.buttonService}
            >
              <Icon28ServicesOutline className={classes.iconService} />
            </IconButton>
          }
          after={
            <IconButton onClick={goToGenerationImagesExamples}>
              <Icon32StarsOutline width={28} height={28} />
            </IconButton>
          }
        >
          <Title level="2" className={classes.title}>
            Stable Art
          </Title>
        </AppPanelHeader>
      }
    >
      <Div className={classes.container}>
        <div>
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
