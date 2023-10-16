import {
  Accordion,
  Banner,
  Button,
  Caption,
  classNames,
  Div,
  FormItem,
  FormLayoutGroup,
  IconButton,
  Image,
  Input,
  Select,
  Separator,
  Slider,
  Spacing,
  Textarea,
  Title,
  useConfigProvider,
} from "@vkontakte/vkui";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import { AppContainer } from "$/components/AppContainer";
import React, { useEffect } from "react";
import { AppDiv } from "$/components/AppDiv";
import { models, samplers, styles } from "$/entity/image/styles";
import {
  Icon20SunOutline,
  Icon20Verified,
  Icon24HelpOutline,
  Icon24MagicWandOutline,
  Icon28CheckCircleOn,
  Icon28ServicesOutline,
} from "@vkontakte/icons";
import { ImageAspectRatio } from "$/entity/image/types";
import { getImageSize } from "$/panels/ImageGeneration/utils";
import { TextTooltip } from "@vkontakte/vkui/dist/components/TextTooltip/TextTooltip";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";

function ImageGenerationMobile() {
  const {
    goToGenerationImagesResult,
    goToGenerationImagesExamples,
    goToGenerationImagesPrompts,
  } = useNavigationContext();
  const { appearance } = useConfigProvider();
  const generateImage = imageGeneration.generateImage$;

  useEffect(() => {
    imageGeneration.imageSize.set(imageGeneration.aspectRatio$.get());
  }, [imageGeneration.result$.get()]);

  return (
    <AppContainer
      headerChildren={
        <AppPanelHeader
          before={<Icon28ServicesOutline />}
          after={
            <IconButton onClick={goToGenerationImagesExamples}>
              <Icon20SunOutline />
            </IconButton>
          }
        >
          Stable Art
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
            onClick={() => {
              imageGeneration.generate();
              goToGenerationImagesResult();
            }}
          >
            Сгенерировать
          </Button>
        </Div>
      }
    >
      <Div className={classes.mobileContainer}>
        <FormItem
          className={classes.formItem}
          onFocus={() => {
            imageGeneration.error$.set("");
          }}
          htmlFor="prompt"
          status={imageGeneration.error$.get() ? "error" : "default"}
          bottom={imageGeneration.error$.get()}
        >
          <Textarea
            maxLength={1000}
            value={imageGeneration.prompt$.get()}
            onChange={(event) => imageGeneration.setPrompt(event.target.value)}
            id="prompt"
            className={classes.textArea}
            placeholder="Напишите запрос для изображения"
          />
        </FormItem>
        <Spacing size={12} />
        <Button
          style={{ width: "100%" }}
          loading={imageGeneration.chatGpt.sendCompletions$.loading.get()}
          onClick={goToGenerationImagesPrompts}
          size="s"
          mode="outline"
          after={<Icon24MagicWandOutline />}
        >
          Собрать запрос
        </Button>
        <Spacing size={12} />
        <Accordion open={true} className={classes.accordion}>
          <Accordion.Summary>
            <Title level="3" weight="3" className={classes.accordionTitle}>
              Выбрать стиль
            </Title>
          </Accordion.Summary>
          <Separator wide className={classes.separator} />
          <AppDiv className={classes.styles}>
            <div className={classes.accordionItems}>
              {styles.map((model) => (
                <div
                  onClick={() => imageGeneration.setModel(model.value)}
                  key={model.value}
                  className={classNames(classes.accordionItem)}
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
              ))}
            </div>
          </AppDiv>
        </Accordion>
        <Spacing size={12} />
        <Accordion open={true} className={classes.accordion}>
          <Accordion.Summary>
            <Title level="3" weight="3" className={classes.accordionTitle}>
              Размер фотографии
            </Title>
          </Accordion.Summary>
          <Separator wide className={classes.separator} />
          <AppDiv>
            <div
              className={classNames(classes.sizes, {
                [classes.sizeDisable]: imageGeneration.loading$.get(),
              })}
            >
              {Object.values(ImageAspectRatio).map((aspectRatio) => (
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
                      className={classNames(classes.size, classes[aspectRatio])}
                    />
                  }
                />
              ))}
            </div>
            <Spacing size={8} />
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
                      appearance={appearance === "light" ? "accent" : "white"}
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
                      appearance={appearance === "light" ? "accent" : "white"}
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
                      appearance={appearance === "light" ? "accent" : "white"}
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
                      appearance={appearance === "light" ? "accent" : "white"}
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
    </AppContainer>
  );
}

export default ImageGenerationMobile;
