import React from "react";

import { Button, Card, Div, Spacing, Text, Title } from "@vkontakte/vkui";
import { imageGeneration } from "$/entity/image";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { ImageItem } from "$/panels/ImageGeneration/ImageItem";
import { TimeGenerationInfo } from "$/components/TimeGenerationInfo";
import { attempts } from "$/entity/attempts";
import {
  Icon12ArrowDownCircle,
  Icon28CancelCircleFillRed,
} from "@vkontakte/icons";
import { NotEnoughAttempts } from "$/panels/ImageGeneration/NotEnoughAttempts";

function ImageGenerationDesktopResult() {
  const result = imageGeneration.result$;
  const generationIsDisable = attempts.$requests.get() === 0;

  if (generationIsDisable) {
    return (
      <div>
        <TimeGenerationInfo />
        <Spacing size={8} />
        <NotEnoughAttempts />
      </div>
    );
  }

  return (
    <div>
      <TimeGenerationInfo />
      <Spacing size={8} />
      {
        <div className={classes.imageSticky}>
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
      }
    </div>
  );
}

export default ImageGenerationDesktopResult;
