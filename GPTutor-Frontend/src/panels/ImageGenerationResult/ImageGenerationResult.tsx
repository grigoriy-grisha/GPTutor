import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import {
  Banner,
  Button,
  classNames,
  Div,
  IconButton,
  Panel,
  PanelHeaderBack,
  Spacing,
  Spinner,
  usePlatform,
} from "@vkontakte/vkui";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import {
  Icon16ErrorCircleFill,
  Icon24DoneOutline,
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
  Icon48PictureOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { downloadService } from "$/services/DownloadService";
import { shareService } from "$/services/ShareService";

interface IProps {
  id: string;
}

function ImageGenerationResult({ id }: IProps) {
  const platform = usePlatform();
  const { goBack } = useNavigationContext();

  const generateImage = imageGeneration.generateImage$;
  const isDisabled =
    !imageGeneration.result$.get() || generateImage.loading.get();

  function isSaved() {
    const result = imageGeneration.result$.get();
    if (!result) return false;
    return result.expire === null;
  }

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
              onClick={() => {
                imageGeneration.save(imageGeneration.result$.get()!.id);
              }}
              loading={imageGeneration.saveImage$.loading.get()}
              disabled={!imageGeneration.result$.get() || isSaved()}
              before={isSaved() ? <Icon24DoneOutline /> : null}
              style={{ width: "100%" }}
              size="l"
              align="center"
              mode="primary"
            >
              {isSaved() ? "Сохранено" : "Сохранить"}
            </Button>
          </Div>
        }
      >
        <Div className={classes.mobileContainer}>
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
          {
            <div style={{ width: "100%" }}>
              {isDisabled ? (
                <div
                  className={classNames(
                    classes.image,
                    classes[`image${imageGeneration.aspectRatio$.get()}`]
                  )}
                >
                  <div className={classes.imagePlaceholder}>
                    {generateImage.loading.get() ? (
                      <Spinner size="large" />
                    ) : (
                      <Icon48PictureOutline width={86} height={86} />
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={classNames(
                    classes.image,
                    classes[`image${imageGeneration.imageSize.get()}`]
                  )}
                >
                  <img
                    className={classNames(
                      classes.image,
                      classes.generatedImage
                    )}
                    src={imageGeneration.result$.get()?.url}
                    alt="Картинка"
                  />
                </div>
              )}
              <div className={classes.buttons}>
                <IconButton
                  onClick={() => {
                    downloadService.appDownloadLink(
                      platform,
                      imageGeneration.result$.get()!.url
                    );
                  }}
                  disabled={isDisabled}
                >
                  <Icon28ArrowDownToSquareOutline />
                </IconButton>
                <IconButton
                  disabled={isDisabled}
                  onClick={() =>
                    shareService.shareLink(imageGeneration.result$.get()!.url)
                  }
                >
                  <Icon28ShareOutline />
                </IconButton>
              </div>
            </div>
          }
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default ImageGenerationResult;
