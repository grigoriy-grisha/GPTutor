import React from "react";
import {
  Accordion,
  Button,
  Caption,
  Card,
  classNames,
  Div,
  FormItem,
  IconButton,
  Image,
  Panel,
  PanelHeaderBack,
  Spacing,
  Spinner,
  Textarea,
  Title,
} from "@vkontakte/vkui";
import {
  Icon28ArrowDownToSquareOutline,
  Icon28CheckCircleOn,
  Icon28ShareOutline,
  Icon48PictureOutline,
} from "@vkontakte/icons";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import classes from "./ImageGeneration.module.css";
import { styles } from "$/entity/imageGeneration/styles";
import { imageGeneration } from "$/entity/imageGeneration";
import { AppDiv } from "$/components/AppDiv";
import bridge from "@vkontakte/vk-bridge";

interface IProps {
  id: string;
}

function ImageGeneration({ id }: IProps) {
  const generateImage = imageGeneration.generateImage$;

  const isDisabled =
    !imageGeneration.result$.get() || generateImage.loading.get();

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack />}>Картинки</AppPanelHeader>
        }
      >
        <Div className={classes.container}>
          <Card mode="shadow">
            <Div>
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
                  onChange={(event) =>
                    imageGeneration.setPrompt(event.target.value)
                  }
                  id="prompt"
                  className={classes.textArea}
                  placeholder="Напишите запрос для изображения"
                />
              </FormItem>

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
                  <Title
                    level="3"
                    weight="3"
                    className={classes.accordionTitle}
                  >
                    Выбрать стиль
                  </Title>
                </Accordion.Summary>
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
            </Div>
          </Card>
          <Card mode="shadow">
            <Div>
              {
                <div>
                  <div>
                    {isDisabled ? (
                      <div className={classes.image}>
                        {generateImage.loading.get() ? (
                          <Spinner size="large" />
                        ) : (
                          <Icon48PictureOutline width={86} height={86} />
                        )}
                      </div>
                    ) : (
                      <img
                        className={classes.image}
                        src={`https://storage.yandexcloud.net/gptutor-bucket/${
                          imageGeneration.result$.get()?.objectId
                        }`}
                        alt="Картинка"
                      />
                    )}
                    <div className={classes.buttons}>
                      <IconButton
                        onClick={() => {
                          bridge.send("VKWebAppDownloadFile", {
                            url: "https://sun9-28.userapi.com/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg",
                            filename: "test.jpg",
                          });
                        }}
                        disabled={isDisabled}
                      >
                        <Icon28ArrowDownToSquareOutline />
                      </IconButton>
                      <IconButton
                        disabled={isDisabled}
                        onClick={() => {
                          console.log(
                            `https://storage.yandexcloud.net/gptutor-bucket/${
                              imageGeneration.result$.get()?.objectId
                            }`
                          );
                          bridge.send("VKWebAppShare", {
                            link: `https://storage.yandexcloud.net/gptutor-bucket/${
                              imageGeneration.result$.get()?.objectId
                            }`,
                          });
                        }}
                      >
                        <Icon28ShareOutline />
                      </IconButton>
                    </div>
                  </div>
                </div>
              }
            </Div>
          </Card>
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default ImageGeneration;
