import React from "react";

import { Card, Div, Spacing } from "@vkontakte/vkui";
import { imageGeneration } from "$/entity/image";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { ImageItem } from "$/panels/ImageGeneration/ImageItem";
import { TimeGenerationInfo } from "$/components/TimeGenerationInfo";

function ImageGenerationDesktopResult() {
  const result = imageGeneration.result$;

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
