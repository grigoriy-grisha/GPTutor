import * as React from "react";
import { useCallback, useEffect } from "react";

import {
  Div,
  Panel,
  PanelHeaderBack,
  Placeholder,
  ScreenSpinner,
  Search,
  Spacing,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";

import classes from "./PublishingImages.module.css";
import { imagesFeed } from "$/entity/image/imagesFeed";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { Icon56GhostOutline } from "@vkontakte/icons";
import useDebounce from "$/hooks/useDebounce";
import { MasonryGrid } from "$/components/MasonryGrid";
import { PublishingImageItem } from "$/panels/PublishingImages/PublishingImageItem";
import { PublishingImagesList } from "$/panels/PublishingImages/PublishingImagesList";

interface IProps {
  id: string;
}
function PublishingImages({ id }: IProps) {
  const loading = imagesFeed.getImages$.loading.get();
  const hasNextPage = imagesFeed.hasNextHistory$.get();
  const setScrollableElement = useInfinityScroll({
    onLoadMore: () => imagesFeed.nextLoadHistory(),
    hasNextPage,
    loading,
  });

  useEffect(() => {
    imagesFeed.loadHistory();
  }, []);

  const { goBack } = useNavigationContext();

  const images = imagesFeed.images.get();

  const search = useCallback(
    useDebounce(() => {
      imagesFeed.onSearch();
    }),
    []
  );

  return (
    <Panel id={id}>
      <AppContainer
        containerRef={setScrollableElement}
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Лента
          </AppPanelHeader>
        }
        childrenWithHeight={(height, offset) => (
          <div style={{ width: "100%" }}>
            <Search
              value={imagesFeed.searchValue$.get()}
              onChange={(event) => {
                imagesFeed.searchValue$.set(event.target.value);
                search();
              }}
            />
            <Div className={classes.container}>
              <Spacing size={6} />
              <PublishingImagesList offset={offset} />
            </Div>
          </div>
        )}
      />
    </Panel>
  );
}

export default PublishingImages;
