import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import {
  Banner,
  Button,
  Card,
  Div,
  Panel,
  PanelHeaderBack,
  Spacing,
} from "@vkontakte/vkui";

import React, { useEffect } from "react";
import { useNavigationContext } from "$/NavigationContext";
import { imageGeneration } from "$/entity/image";
import { Icon16ErrorCircleFill, Icon24RepeatOutline } from "@vkontakte/icons";
import { ImageItem } from "$/panels/ImageGeneration/ImageItem";

import classes from "$/panels/ImageGeneration/ImageGenerationMobile/ImageGenerationMobile.module.css";
import { TimeGenerationInfo } from "$/components/TimeGenerationInfo";

interface IProps {
  id: string;
}

function ImageGenerationResult({ id }: IProps) {
  const { goBack } = useNavigationContext();

  const result = imageGeneration.result$;

  useEffect(() => {
    if (imageGeneration.resultIsEmpty$.get()) {
      imageGeneration.imageSize.set(imageGeneration.aspectRatio$.get());
      imageGeneration.widthView$.set(imageGeneration.width$.get());
      imageGeneration.heightView$.set(imageGeneration.height$.get());
    }
  }, [imageGeneration.result$.get()]);

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Результат
          </AppPanelHeader>
        }
        fixedBottomContent={
          <Div>
            <Button
              disabled={imageGeneration.loading$.get()}
              onClick={imageGeneration.generate}
              after={<Icon24RepeatOutline />}
              style={{ width: "100%" }}
              size="m"
              align="center"
              mode="primary"
            >
              Повторить
            </Button>
          </Div>
        }
      >
        <div className={classes.container}>
          <TimeGenerationInfo />
          <Spacing size={8} />
          {imageGeneration.error$.get() && (
            <>
              <Banner
                style={{ padding: 0, margin: 0 }}
                before={<Icon16ErrorCircleFill width={24} height={24} />}
                header={imageGeneration.error$.get()}
              />
              <Spacing size={12} />
            </>
          )}
          <div style={{ width: "100%" }}>
            {result.get().map((resultImage, index) => (
              <div key={resultImage.id}>
                <Card mode="shadow">
                  <Div>
                    <ImageItem resultImage={resultImage} />
                  </Div>
                </Card>
                {result.get().length - 1 !== index && <Spacing size={8} />}
              </div>
            ))}
          </div>
        </div>
      </AppContainer>
    </Panel>
  );
}

export default ImageGenerationResult;
