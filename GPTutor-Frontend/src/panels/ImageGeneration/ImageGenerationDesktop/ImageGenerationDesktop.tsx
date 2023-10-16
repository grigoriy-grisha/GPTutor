import React, { useEffect } from "react";

import {
  Accordion,
  Banner,
  Button,
  Card,
  classNames,
  Div,
  FormItem,
  FormLayoutGroup,
  IconButton,
  Input,
  Select,
  Separator,
  Slider,
  Spacing,
  Textarea,
  Title,
  Text,
  useConfigProvider,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import { AppDiv } from "$/components/AppDiv";
import { models, samplers } from "$/entity/image/styles";
import {
  Icon20Clear,
  Icon20SunOutline,
  Icon20Verified,
  Icon24HelpOutline,
  Icon24MagicWandOutline,
  Icon28ServicesOutline,
} from "@vkontakte/icons";
import { ImageAspectRatio } from "$/entity/image/types";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";
import { getImageSize } from "$/panels/ImageGeneration/utils";
import { useNavigationContext } from "$/NavigationContext";
import { ImageGenerationDesktopResult } from "$/panels/ImageGeneration/ImageGenerationDesktop/ImageGenerationDesktopResult";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Attempts } from "$/panels/ImageGeneration/Attempts";

function ImageGenerationDesktop() {
  const { goToGenerationImagesExamples, goToGenerationImagesPrompts } =
    useNavigationContext();
  const { appearance } = useConfigProvider();
  const generateImage = imageGeneration.generateImage$;

  useEffect(() => {
    if (imageGeneration.resultIsEmpty$.get()) {
      imageGeneration.imageSize.set(imageGeneration.aspectRatio$.get());
      imageGeneration.widthView$.set(imageGeneration.width$.get());
      imageGeneration.heightView$.set(imageGeneration.height$.get());
    }
  }, [imageGeneration.result$.get()]);

  return (
    <AppContainer
      headerChildren={
        <AppPanelHeader
          before={
            <IconButton>
              <Icon28ServicesOutline />
            </IconButton>
          }
          after={
            <IconButton onClick={goToGenerationImagesExamples}>
              <Icon20SunOutline width={28} height={28} />
            </IconButton>
          }
        >
          <Title level="2">Stable Art</Title>
        </AppPanelHeader>
      }
    >
      <Div className={classes.container}>
        <Card mode="shadow">
          <Div>
            <Attempts />
            <Spacing size={12} />
            <FormItem
              className={classes.formItem}
              onFocus={() => {
                imageGeneration.error$.set("");
              }}
              htmlFor="prompt"
              status={imageGeneration.error$.get() ? "error" : "default"}
              bottom={imageGeneration.error$.get()}
            >
              <div className={classes.textAreaContainer}>
                <Textarea
                  maxLength={1000}
                  value={imageGeneration.prompt$.get()}
                  onChange={(event) =>
                    imageGeneration.setPrompt(event.target.value)
                  }
                  id="prompt"
                  className={classes.textArea}
                  placeholder="Напишите запрос для изображения"
                />
                <IconButton
                  onClick={() => imageGeneration.prompt$.set("")}
                  className={classes.clearIcon}
                  disabled={!imageGeneration.prompt$.get()}
                >
                  <Icon20Clear width={16} height={16} />
                </IconButton>
              </div>
            </FormItem>
            <Spacing size={12} />
            <Button
              className={classes.button}
              onClick={() => goToGenerationImagesPrompts()}
              size="l"
              mode="outline"
              after={<Icon24MagicWandOutline />}
            >
              Собрать запрос
            </Button>
            <Spacing size={12} />
            <Button
              loading={generateImage.loading.get()}
              className={classes.button}
              size="l"
              align="center"
              mode="primary"
              onClick={imageGeneration.generate}
            >
              Сгенерировать
            </Button>
            <Spacing size={12} />
            <Accordion open={true} className={classes.accordion}>
              <Accordion.Summary>
                <Title level="3" weight="3" className={classes.accordionTitle}>
                  Параметры результата
                </Title>
              </Accordion.Summary>
              <Separator wide className={classes.separator} />
              <AppDiv>
                <Spacing size={6} />
                <div
                  className={classNames(classes.sizes, {
                    [classes.sizeDisable]: imageGeneration.loading$.get(),
                  })}
                >
                  {Object.values(ImageAspectRatio).map((aspectRatio) => {
                    if (aspectRatio === ImageAspectRatio.custom) return null;

                    return (
                      <Banner
                        className={classNames({
                          [classes.sizeActive]:
                            imageGeneration.aspectRatio$.get() === aspectRatio,
                        })}
                        key={aspectRatio}
                        onClick={() =>
                          imageGeneration.setAspectRatio(aspectRatio)
                        }
                        asideMode="expand"
                        header={
                          <div className={classes.sizeText}>
                            {getImageSize(aspectRatio)}
                            {imageGeneration.aspectRatio$.get() ===
                              aspectRatio && (
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
                    options={["1", "2", "3", "4"].map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    onChange={(event) => {
                      imageGeneration.setSamples(event.target.value);
                    }}
                    value={String(imageGeneration.samples$.get())}
                  />
                </FormItem>
                <Spacing size={6} />
              </AppDiv>
            </Accordion>
            <Spacing size={12} />
            <Accordion className={classes.accordion}>
              <Accordion.Summary>
                <Title level="3" weight="3" className={classes.accordionTitle}>
                  Расширенные настройки
                </Title>
              </Accordion.Summary>
              <Separator wide className={classes.separator} />
              <AppDiv>
                <FormItem
                  htmlFor="seed"
                  top={
                    <div className={classes.formItemTitle}>
                      Негативные подсказки
                      <TextTooltip
                        id="step"
                        text="Негативные подсказки, то, чего не должно быть на изображении. Значения вписываются через запятую. Например: уродство, деформированные конечности, усы"
                        appearance={appearance === "light" ? "accent" : "white"}
                        style={{ maxWidth: 350 }}
                        placement="top-end"
                      >
                        <Icon24HelpOutline width={20} height={20} />
                      </TextTooltip>
                    </div>
                  }
                >
                  <Input
                    placeholder="Что не должно быть на изображении, перечислите через запятую"
                    id="seed"
                    type="text"
                    value={imageGeneration.negativePrompts$.get()}
                    onChange={(event) =>
                      imageGeneration.setNegativePrompts(event.target.value)
                    }
                  />
                </FormItem>
                <FormLayoutGroup mode="vertical">
                  <FormItem
                    htmlFor="model"
                    top={
                      <div className={classes.formItemTitle}>
                        Модель
                        <TextTooltip
                          id="model"
                          appearance={
                            appearance === "light" ? "accent" : "white"
                          }
                          style={{ maxWidth: 350 }}
                          placement="top-end"
                          text="Модель - это то, с помощью чего будет нарисовано изображение. Она определяет стиль и характеристики изображения."
                        >
                          <Icon24HelpOutline width={20} height={20} />
                        </TextTooltip>
                      </div>
                    }
                  >
                    <Select
                      options={models}
                      value={imageGeneration.model$.get()}
                      onChange={(event) => {
                        imageGeneration.setModel(event.target.value);
                      }}
                    />
                  </FormItem>
                  <FormItem
                    htmlFor="sampler"
                    top={
                      <div className={classes.formItemTitle}>
                        Сэмплер
                        <TextTooltip
                          id="sampler"
                          appearance={
                            appearance === "light" ? "accent" : "white"
                          }
                          style={{ maxWidth: 350 }}
                          placement="top-end"
                          text="Сэмплер — процессы, влияющие на результат генерации. С помощью правильно настроенного сэмплера можно получить разнообразные и интересные результаты при каждой генерации."
                        >
                          <Icon24HelpOutline width={20} height={20} />
                        </TextTooltip>
                      </div>
                    }
                  >
                    <Select
                      options={samplers}
                      value={imageGeneration.sampler$.get()}
                      onChange={(event) => {
                        imageGeneration.setSampler(event.target.value);
                      }}
                    />
                  </FormItem>
                  <FormItem
                    htmlFor="CFGScale"
                    top={
                      <div className={classes.formItemTitle}>
                        CFG Scale
                        <TextTooltip
                          appearance={
                            appearance === "light" ? "accent" : "white"
                          }
                          style={{ maxWidth: 350 }}
                          placement="top-end"
                          text="CFG Scale — креативность нейросети. Чем ниже значение, тем сильнее нейросеть будет игнорировать ваш запрос. Чем выше, тем сильнее нейросеть придерживается вашего запроса."
                        >
                          <Icon24HelpOutline width={20} height={20} />
                        </TextTooltip>
                      </div>
                    }
                  >
                    <div>
                      {imageGeneration.CFGScale$.get()}
                      <Spacing size={4} />
                      <Slider
                        step={1}
                        min={0}
                        max={20}
                        id="CFGScale"
                        value={imageGeneration.CFGScale$.get()}
                        onChange={imageGeneration.setCFGScale}
                      />
                    </div>
                  </FormItem>
                  <FormItem
                    id="step"
                    top={
                      <div className={classes.formItemTitle}>
                        Шаги
                        <TextTooltip
                          appearance={
                            appearance === "light" ? "accent" : "white"
                          }
                          style={{ maxWidth: 350 }}
                          placement="top-end"
                          text="Шаги — сколько шагов нейросеть сделает, пока генерирует изображение. Чем больше шагов, тем качественнее должен быть результат, а значит, тем больше времени уйдет на обработку запроса."
                        >
                          <Icon24HelpOutline width={20} height={20} />
                        </TextTooltip>
                      </div>
                    }
                  >
                    <div>
                      {imageGeneration.step$.get()}
                      <Spacing size={4} />
                      <Slider
                        step={1}
                        min={1}
                        max={50}
                        id="step"
                        value={imageGeneration.step$.get()}
                        onChange={imageGeneration.setStep}
                      />
                    </div>
                  </FormItem>
                  <FormItem
                    htmlFor="seed"
                    top={
                      <div className={classes.formItemTitle}>
                        Сид
                        <TextTooltip
                          id="step"
                          text="Cид — стартовая точка, число, из которого нейросеть затем формирует изображение. По умолчанию стоит «случайный» параметр — это помогает достигать разных результатов при одном и том же запросе. А если вы используете конкретное номерное значение сида, то потом даже при смене запроса композиция картинки останется схожей. Всего сидов около 16 миллиардов."
                          appearance={
                            appearance === "light" ? "accent" : "white"
                          }
                          style={{ maxWidth: 350 }}
                          placement="top-end"
                        >
                          <Icon24HelpOutline width={20} height={20} />
                        </TextTooltip>
                      </div>
                    }
                  >
                    <Input
                      id="seed"
                      type="text"
                      value={imageGeneration.seed$.get()}
                      onChange={(event) =>
                        imageGeneration.setSeed(
                          event.target.value as unknown as number
                        )
                      }
                    />
                  </FormItem>
                </FormLayoutGroup>
              </AppDiv>
              <Spacing size={8} />
            </Accordion>
          </Div>
        </Card>
        <ImageGenerationDesktopResult />
      </Div>
    </AppContainer>
  );
}

export default ImageGenerationDesktop;
