import * as React from "react";
import { useCallback, useEffect } from "react";

import {
  Panel,
  PanelHeader,
  Platform,
  Search,
  Spacing,
  usePlatform,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { imagesFeed } from "$/entity/image/imagesFeed";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import useDebounce from "$/hooks/useDebounce";
import { PublishingImagesList } from "$/panels/PublishingImages/PublishingImagesList";

import classes from "./PublishingImages.module.css";

interface IProps {
  id: string;
}
function PublishingImages({ id }: IProps) {
  const platform = usePlatform();

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
        headerChildren={<PanelHeader>Лента</PanelHeader>}
        childrenWithHeight={(height, offset) => (
          <div style={{ width: "100%", height: height, maxHeight: height }}>
            <Search
              value={imagesFeed.searchValue$.get()}
              onChange={(event) => {
                imagesFeed.searchValue$.set(event.target.value);
                search();
              }}
            />
            <Spacing size={6} />
            <div
              style={{
                width: "100%",
                height: `calc(100vh - ${offset}px - 50px)`,
                maxHeight: height,
              }}
              className={
                platform !== Platform.VKCOM
                  ? classes.container
                  : classes.containerDesktop
              }
            >
              <PublishingImagesList />
            </div>
          </div>
        )}
      />
    </Panel>
  );
}

export default PublishingImages;
