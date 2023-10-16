import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  classNames,
  Headline,
  IconButton,
  Panel,
  PanelHeaderBack,
  Platform,
  usePlatform,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { imageHistory } from "$/entity/image/ImageHistory";
import {
  Icon24RepeatOutline,
  Icon28ArrowDownToSquareOutline,
} from "@vkontakte/icons";

import classes from "./Gallery.module.css";
import AppBanner from "$/components/AppBanner";
import { getModelByValue } from "$/entity/image/styles";
import { downloadService } from "$/services/DownloadService";
import { imageGeneration } from "$/entity/image";

interface IProps {
  id: string;
}

function Gallery({ id }: IProps) {
  const platform = usePlatform();
  const pageNumber = imageHistory.pageNumber;
  const loading = imageHistory.getImages$.loading.get();
  const hasNextPage = imageHistory.hasNextHistory$.get();
  const images = imageHistory.images;

  const { goBack, goToGenerationImagesResult } = useNavigationContext();
  const setScrollableElement = useInfinityScroll({
    onLoadMore: () => imageHistory.nextLoadHistory(),
    hasNextPage,
    loading,
  });

  useEffect(() => {
    imageHistory.loadHistory();
  }, []);

  return (
    <Panel id={id}>
      <AppContainer
        containerRef={setScrollableElement}
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Галлерея
          </AppPanelHeader>
        }
      >
        <div className={classes.container}>
          {images.get().map((image) => {
            return (
              <AppBanner
                before={
                  <img
                    className={classNames(classes.image, {
                      [classes.imageMobile]: platform !== Platform.VKCOM,
                    })}
                    src={image.item.url}
                  />
                }
                key={image.item.url}
                header={getModelByValue(image.item.modelId).label}
                subheader={
                  <div className={classes.subHeader}>
                    <div>{image.item.prompt}</div>
                    <div>
                      <Headline
                        style={{ display: "inline" }}
                        level="2"
                        weight="1"
                      >
                        Создано:
                      </Headline>{" "}
                      {new Date(image.item.createdAt).toLocaleString()}
                    </div>

                    <div>
                      <Headline
                        style={{ display: "inline" }}
                        level="2"
                        weight="1"
                      >
                        Хранение:
                      </Headline>{" "}
                      {image.item.expire
                        ? new Date(image.item.expire).toLocaleString()
                        : "Бессрочно"}
                    </div>
                  </div>
                }
                actions={
                  <div className={classes.buttons}>
                    <ButtonGroup
                      mode={
                        platform === Platform.VKCOM ? "horizontal" : "vertical"
                      }
                    >
                      {image.item.expire && (
                        <Button
                          size="m"
                          mode="outline"
                          loading={image.loading$.get()}
                          onClick={() => imageHistory.saveImage(image)}
                        >
                          Сохранить
                        </Button>
                      )}
                      <Button
                        size="m"
                        after={<Icon24RepeatOutline />}
                        onClick={() => {
                          imageGeneration.applyExample(image.item);
                          if (platform !== Platform.VKCOM) {
                            goToGenerationImagesResult();
                          } else {
                            goBack();
                          }
                          imageGeneration.generate();
                        }}
                      >
                        Повторить
                      </Button>
                    </ButtonGroup>
                    <div className={classes.additionButtons}>
                      <IconButton
                        onClick={() => {
                          downloadService.appDownloadLink(
                            platform,
                            image.item.url
                          );
                        }}
                      >
                        <Icon28ArrowDownToSquareOutline />
                      </IconButton>
                    </div>
                  </div>
                }
              />
            );
          })}
        </div>
      </AppContainer>
    </Panel>
  );
}

export default Gallery;
