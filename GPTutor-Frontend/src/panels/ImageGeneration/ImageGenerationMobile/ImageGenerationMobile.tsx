import React, { useEffect } from "react";
import {
  Button,
  Div,
  IconButton,
  Separator,
  Spacing,
  Tabs,
  TabsItem,
  Text,
} from "@vkontakte/vkui";
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
              style={{ marginLeft: 6 }}
              onClick={openApplicationInfoStableArt}
              className={classes.buttonService}
            >
              <Icon28ServicesOutline
                width={22}
                height={22}
                className={classes.iconService}
              />
            </IconButton>
          }
          after={
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
                target="_blank"
                href="https://vk.com/@gptutor-primer-sozdaniya-kachestvennogo-zaprosa"
              >
                <Icon28HelpCircleOutline width={22} height={22} />
              </IconButton>
              <IconButton onClick={goToGenerationImagesExamples}>
                <Icon32StarsOutline width={22} height={22} />
              </IconButton>
            </div>
          }
        >
          <Text weight="1">Stable Art</Text>
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
        <Tabs layoutFillMode="shrinked" mode="secondary">
          <TabsItem
            selected
            id="tab-recommendations"
            aria-controls="tab-content-recommendations"
          >
            Интересное
          </TabsItem>
          <TabsItem
            id="tab-recommendations"
            aria-controls="tab-content-recommendations"
          >
            Интересное
          </TabsItem>
          <TabsItem
            id="tab-recommendations"
            aria-controls="tab-content-recommendations"
          >
            Интересное
          </TabsItem>
          <TabsItem
            id="tab-recommendations"
            aria-controls="tab-content-recommendations"
          >
            Интересное
          </TabsItem>
        </Tabs>
        <Separator wide />
        <Spacing size={8} />
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
