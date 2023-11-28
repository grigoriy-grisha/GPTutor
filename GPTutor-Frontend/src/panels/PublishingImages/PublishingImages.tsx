import * as React from "react";
import { useCallback, useEffect } from "react";

import { Panel, PanelHeader, Search, Spacing } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";

import classes from "./PublishingImages.module.css";
import { imagesFeed } from "$/entity/image/imagesFeed";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import useDebounce from "$/hooks/useDebounce";
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
        childrenWithHeight={(_, offset) => (
          <div style={{ width: "100%" }}>
            <Search
              value={imagesFeed.searchValue$.get()}
              onChange={(event) => {
                imagesFeed.searchValue$.set(event.target.value);
                search();
              }}
            />
            <Spacing size={6} />
            <div className={classes.container}>
              <PublishingImagesList offset={offset} />
            </div>
          </div>
        )}
      />
    </Panel>
  );
}

export default PublishingImages;
