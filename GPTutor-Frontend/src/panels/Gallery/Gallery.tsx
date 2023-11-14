import React, { useEffect } from "react";
import { Panel, PanelHeaderBack, usePlatform } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { imageHistory } from "$/entity/image/ImageHistory";
import { ImagesList } from "$/panels/Gallery/ImagesList";

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
        <ImagesList />
      </AppContainer>
    </Panel>
  );
}

export default Gallery;
