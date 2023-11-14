import React, { useEffect } from "react";
import {
  Banner,
  Button,
  ButtonGroup,
  Div,
  Headline,
  Image,
  Panel,
  PanelHeaderBack,
  Text,
  Title,
  usePlatform,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { imageHistory } from "$/entity/image/ImageHistory";
import { ImagesList } from "$/panels/Gallery/ImagesList";

import classes from "./Gallery.module.css";
import Subscription from "$/panels/Gallery/Subscription/Subscription";
import { AppDiv } from "$/components/AppDiv";

interface IProps {
  id: string;
}

function Gallery({ id }: IProps) {
  const loading = imageHistory.getImages$.loading.get();
  const hasNextPage = imageHistory.hasNextHistory$.get();

  const { goBack } = useNavigationContext();

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
            Коллекция
          </AppPanelHeader>
        }
      >
        <div style={{ width: "100%" }}>
          <AppDiv>
            <Title level="3" className={classes.title}>
              Профиль
            </Title>
          </AppDiv>
          <Subscription />
          <AppDiv>
            <Title level="3" className={classes.title}>
              Коллекция
            </Title>
          </AppDiv>
          <ImagesList />
        </div>
      </AppContainer>
    </Panel>
  );
}

export default Gallery;
