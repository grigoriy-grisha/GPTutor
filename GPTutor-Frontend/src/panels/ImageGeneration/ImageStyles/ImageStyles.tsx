import React from "react";

import {
  Accordion,
  Caption,
  Card,
  Div,
  HorizontalCell,
  HorizontalScroll,
  Image,
  Separator,
  Title,
} from "@vkontakte/vkui";
import { Icon28CheckCircleOn } from "@vkontakte/icons";

import { styles } from "$/entity/image/styles";
import { imageGeneration } from "$/entity/image";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";

function ImageStyles() {
  function isSelected(model: any) {
    const loraModel = imageGeneration.loraModel$.get();

    if (loraModel) {
      if (!model.loraModel) return false;

      return (
        loraModel === model.loraModel &&
        imageGeneration.model$.get() === model.value
      );
    }

    if (model.loraModel) return false;

    return imageGeneration.model$.get() === model.value;
  }

  return (
    <Card mode="shadow">
      <Div>
        <div className={classes.accordion}>
          <Accordion expanded={true}>
            <Accordion.Summary>
              <Title
                level="3"
                weight="3"
                className={classes.accordionTitle}
                Component="h3"
              >
                Выбрать стиль
              </Title>
            </Accordion.Summary>
            <Separator wide className={classes.separator} />
            <div>
              <HorizontalScroll>
                <div
                  className={classes.accordionItems}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${styles?.length}, max-content)`,
                  }}
                >
                  {styles.map((model) => (
                    <HorizontalCell
                      key={model.value + model.loraModel}
                      size="l"
                    >
                      <div
                        onClick={() => {
                          imageGeneration.setModel(model.value);
                          model.loraModel &&
                            imageGeneration.setLoraModel(model.loraModel);
                        }}
                        className={classes.accordionItem}
                      >
                        <Image
                          className={classes.accordionImage}
                          src={`https://storage.yandexcloud.net/gptutor-bucket/${model.imageName}`}
                        >
                          {isSelected(model) && (
                            <Image.Badge>
                              <Icon28CheckCircleOn
                                className={classes.badge}
                                width={24}
                                height={24}
                              />
                            </Image.Badge>
                          )}
                          <Image.Overlay>
                            <></>
                          </Image.Overlay>
                        </Image>
                        <Caption level="1">{model.label}</Caption>
                      </div>
                    </HorizontalCell>
                  ))}
                </div>
              </HorizontalScroll>
            </div>
          </Accordion>
        </div>
      </Div>
    </Card>
  );
}

export default ImageStyles;
