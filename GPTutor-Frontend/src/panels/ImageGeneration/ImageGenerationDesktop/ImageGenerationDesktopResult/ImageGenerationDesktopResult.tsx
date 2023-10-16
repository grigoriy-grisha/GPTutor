import React, { useEffect } from "react";

import {
  Button,
  Card,
  classNames,
  Div,
  FormField,
  FormItem,
  IconButton,
  Spacing,
  Spinner,
  usePlatform,
} from "@vkontakte/vkui";
import { imageGeneration } from "$/entity/image";
import {
  Icon24DoneOutline,
  Icon28ArrowDownToSquareOutline,
  Icon28ShareOutline,
  Icon48PictureOutline,
} from "@vkontakte/icons";
import { downloadService } from "$/services/DownloadService";
import { shareService } from "$/services/ShareService";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { Stepper } from "$/components/Stepper";
import bridge from "@vkontakte/vk-bridge";
import TimeLoading from "../../../../components/TimeLoading/TimeLoading";

function ImageGenerationDesktopResult() {
  const platform = usePlatform();

  const generateImage = imageGeneration.generateImage$;
  const result = imageGeneration.result$;

  const aspectRatioPadding =
    (imageGeneration.heightView$.get() / imageGeneration.widthView$.get()) *
    100;

  // Проверка готовности рекламы

  return (
    <Card mode="shadow" className={classes.imageSticky}>
      <Div>
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
