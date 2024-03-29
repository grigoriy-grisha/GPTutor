import React from "react";

import {
  Accordion,
  Banner,
  Button,
  Card,
  classNames,
  Div,
  FormItem,
  Platform,
  Select,
  Separator,
  Slider,
  Spacing,
  Title,
  usePlatform,
} from "@vkontakte/vkui";
import { imageGeneration } from "$/entity/image";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { AppDiv } from "$/components/AppDiv";
import { ImageAspectRatio } from "$/entity/image/types";
import { getImageSize } from "$/panels/ImageGeneration/utils";
import { Icon20Verified, Icon24LockOpenOutline } from "@vkontakte/icons";
import { attempts } from "$/entity/attempts";
import { subscriptionsController } from "$/entity/subscriptions";

function RequestParameters() {
  const platform = usePlatform();

  return (
    <Card mode="shadow">
      <Div>
        <Spacing size={6} />
        <Accordion
          open={imageGeneration.requestParameters}
          className={classes.accordion}
        >
          <Accordion.Summary onClick={imageGeneration.toggleRequestParameters}>
            <Title level="3" weight="3" className={classes.accordionTitle}>
              Параметры результата
            </Title>
          </Accordion.Summary>
          <Separator wide className={classes.separator} />
          <AppDiv
            className={classNames(classes.imageSettings, {
              [classes.sizeDisable]: imageGeneration.loading$.get(),
            })}
          >
            <Spacing size={6} />
            <div className={classNames(classes.sizes)}>
              {Object.values(ImageAspectRatio).map((aspectRatio) => {
                if (aspectRatio === ImageAspectRatio.custom) return null;

                return (
                  <Banner
                    className={classNames({
                      [classes.sizeActive]:
                        imageGeneration.aspectRatio$.get() === aspectRatio,
                    })}
                    key={aspectRatio}
                    onClick={() => imageGeneration.setAspectRatio(aspectRatio)}
                    asideMode="expand"
                    header={
                      <div className={classes.sizeText}>
                        {getImageSize(aspectRatio)}
                        {imageGeneration.aspectRatio$.get() === aspectRatio && (
                          <Icon20Verified width={24} height={24} />
                        )}
                      </div>
                    }
                    before={
                      <div
                        className={classNames(
                          classes.size,
                          classes[aspectRatio]
                        )}
                      />
                    }
                  />
                );
              })}
            </div>

            <Spacing size={8} />
            <FormItem id="step" top="Ширина">
              <div>
                {imageGeneration.width$.get()}
                <Spacing size={4} />
                <Slider
                  step={8}
                  min={512}
                  max={1024}
                  id="step"
                  value={imageGeneration.width$.get()}
                  onChange={imageGeneration.setWidth}
                />
              </div>
            </FormItem>
            <FormItem id="step" top="Высота">
              <div>
                {imageGeneration.height$.get()}
                <Spacing size={4} />
                <Slider
                  step={8}
                  min={512}
                  max={1024}
                  id="step"
                  value={imageGeneration.height$.get()}
                  onChange={imageGeneration.setHeight}
                />
              </div>
            </FormItem>
            <Spacing size={8} />
            <FormItem top="Количество изображений">
              <Select
                options={["1", "2", "3", "4"]
                  .map((item) => ({
                    label: item,
                    value: item,
                  }))
                  .slice(0, attempts.$requests.get())}
                onChange={(event) => {
                  imageGeneration.setSamples(event.target.value);
                }}
                value={String(imageGeneration.samples$.get())}
              />
            </FormItem>
            <Spacing size={6} />
          </AppDiv>
        </Accordion>
      </Div>
    </Card>
  );
}

export default RequestParameters;
