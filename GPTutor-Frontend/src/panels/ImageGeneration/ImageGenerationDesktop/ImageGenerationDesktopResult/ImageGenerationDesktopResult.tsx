import React from "react";

import {
  Button,
  Caption,
  Card,
  classNames,
  Div,
  IconButton,
  Spacing,
  Tappable,
  usePlatform,
} from "@vkontakte/vkui";
import { imageGeneration } from "$/entity/image";
import {
  Icon24DoneOutline,
  Icon28ArrowDownToSquareOutline,
  Icon48PictureOutline,
  Icon24ClockOutline,
} from "@vkontakte/icons";
import { downloadService } from "$/services/DownloadService";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import TimeLoading from "../../../../components/TimeLoading/TimeLoading";
import { imageService } from "$/services/ImageService";
import { ImageSeed } from "$/panels/ImageGeneration/ImageSeed";

function ImageGenerationDesktopResult() {
  const platform = usePlatform();

  const generateImage = imageGeneration.generateImage$;
  const result = imageGeneration.result$;

  const aspectRatioPadding =
    (imageGeneration.heightView$.get() / imageGeneration.widthView$.get()) *
    100;

  return (
    <Card mode="shadow" className={classes.imageSticky}>
      <Div>
        <Card mode="outline">
          <Div className={classes.time}>
            <div className={classes.timeIcon}>
              <Icon24ClockOutline />
            </div>
            <div>
              <Caption>Средне время ожидания 30 секунд</Caption>
              <Spacing size={4} />
              <Caption>Максимальное время ожидания 3 минуты</Caption>
            </div>
          </Div>
        </Card>
        <Spacing size={8} />
        {
          <div>
            {result.get().map((resultImage) => {
              const isEmpty = !resultImage.modelId;

              function isSaved() {
                if (!result) return false;
                return resultImage.expire === null;
              }

              return (
                <div key={resultImage.id}>
                  {isEmpty ? (
                    <div
                      style={{ paddingBottom: `${aspectRatioPadding}%` }}
                      className={classNames(classes.image)}
                    >
                      <div className={classes.imagePlaceholder}>
                        {generateImage.loading.get() ? (
                          <TimeLoading timer={imageGeneration.timer} />
                        ) : (
                          <Icon48PictureOutline width={86} height={86} />
                        )}
                      </div>
                    </div>
                  ) : (
                    <Tappable
                      hoverMode="opacity"
                      activeMode="opacity"
                      onClick={() => imageService.openImages([resultImage.url])}
                    >
                      <div
                        style={{ paddingBottom: `${aspectRatioPadding}%` }}
                        className={classNames(classes.image)}
                      >
                        <img
                          className={classNames(
                            classes.image,
                            classes.generatedImage
                          )}
                          src={resultImage.url}
                          alt="Картинка"
                        />
                      </div>
                    </Tappable>
                  )}

                  {resultImage.generatedSeed && (
                    <>
                      <Spacing size={6} />
                      <ImageSeed seed={resultImage.generatedSeed} />
                    </>
                  )}
                  <Spacing size={12} />
                  <div className={classes.buttons}>
                    <Button
                      onClick={() => {
                        imageGeneration.save(resultImage.id);
                      }}
                      loading={imageGeneration.saveImage$.loading.get()}
                      disabled={isEmpty || isSaved()}
                      before={isSaved() ? <Icon24DoneOutline /> : null}
                      style={{ width: "100%" }}
                      size="l"
                      align="center"
                      mode="primary"
                    >
                      {isSaved() ? "Сохранено" : "Сохранить"}
                    </Button>
                    <IconButton
                      onClick={() => {
                        downloadService.appDownloadLink(
                          platform,
                          resultImage.url
                        );
                      }}
                      disabled={isEmpty}
                    >
                      <Icon28ArrowDownToSquareOutline />
                    </IconButton>
                  </div>
                  <Spacing size={12} />
                </div>
              );
            })}
          </div>
        }
      </Div>
    </Card>
  );
}

export default ImageGenerationDesktopResult;
