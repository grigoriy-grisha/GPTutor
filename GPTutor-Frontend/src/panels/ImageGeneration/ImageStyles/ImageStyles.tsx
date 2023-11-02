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
  return (
    <Card mode="shadow">
      <Div>
        <Accordion open={true} className={classes.accordion}>
          <Accordion.Summary>
            <Title level="3" weight="3" className={classes.accordionTitle}>
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
                  <HorizontalCell key={model.value} size="l">
                    <div
                      onClick={() => imageGeneration.setModel(model.value)}
                      className={classes.accordionItem}
                    >
                      <Image
                        className={classes.accordionImage}
                        src={`https://storage.yandexcloud.net/gptutor-bucket/${model.imageName}`}
                      >
                        {imageGeneration.model$.get() === model.value && (
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
      </Div>
    </Card>
  );
}

export default ImageStyles;
