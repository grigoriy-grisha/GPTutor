import React from "react";

import { imageHistory } from "$/entity/image/ImageHistory";

import classes from "../Gallery.module.css";
import { ImageItem } from "../ImageItem";
import { Button, Placeholder } from "@vkontakte/vkui";
import { Icon24MagicWandOutline, Icon56GhostOutline } from "@vkontakte/icons";
import { useNavigationContext } from "$/NavigationContext";

function ImagesList() {
  const { goToGenerationImages } = useNavigationContext();
  const images = imageHistory.images;

  if (images.get().length === 0) {
    return (
      <div className={classes.container}>
        <Placeholder
          icon={<Icon56GhostOutline width={64} height={64} />}
          header="Нет сгенерированных изображений"
          action={
            <Button
              mode="outline"
              size="m"
              after={<Icon24MagicWandOutline />}
              onClick={goToGenerationImages}
            >
              Начать генерировать
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {images.get().map((image) => (
        <ImageItem key={image.item.id} image={image} />
      ))}
    </div>
  );
}

export default ImagesList;
