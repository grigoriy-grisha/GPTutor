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
import { imageGeneration } from "$/entity/imageGeneration";
import {
  Icon16ErrorCircleFill,
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
  Icon48PictureOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

interface IProps {
  id: string;
}

function ImageGenerationResult({ id }: IProps) {
  const platform = usePlatform();
  const { goBack } = useNavigationContext();

  const generateImage = imageGeneration.generateImage$;
  const isDisabled =
    !imageGeneration.result$.get() || generateImage.loading.get();

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
              loading={generateImage.loading.get()}
              className={classes.button}
              size="m"
              align="center"
              mode="primary"
              onClick={goBack}
            >
              Вернуться к настройкам
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
                <img
                  className={classes.imageResult}
                  src={`https://storage.yandexcloud.net/gptutor-bucket/${
                    imageGeneration.result$.get()?.objectId
                  }`}
                  alt="Картинка"
                />
              )}
              <div className={classes.buttons}>
                <IconButton
                  onClick={() => {
                    bridge.send("VKWebAppDownloadFile", {
                      url: "https://sun9-28.userapi.com/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg",
                      filename: "test.jpg",
                    });
                  }}
                  disabled={isDisabled}
                >
                  <Icon28ArrowDownToSquareOutline />
                </IconButton>
                <IconButton
                  disabled={isDisabled}
                  onClick={() => {
                    console.log(
                      `https://storage.yandexcloud.net/gptutor-bucket/${
                        imageGeneration.result$.get()?.objectId
                      }`
                    );
                    bridge.send("VKWebAppShare", {
                      link: `https://storage.yandexcloud.net/gptutor-bucket/${
                        imageGeneration.result$.get()?.objectId
                      }`,
                    });
                  }}
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
