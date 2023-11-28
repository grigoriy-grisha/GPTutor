import { imagesFeed } from "$/entity/image/imagesFeed";
import {
  Placeholder,
  Platform,
  ScreenSpinner,
  usePlatform,
} from "@vkontakte/vkui";
import * as React from "react";
import { useMemo } from "react";
import { Icon56GhostOutline } from "@vkontakte/icons";
import { MasonryGrid } from "$/components/MasonryGrid";
import { PublishingImageItem } from "$/panels/PublishingImages/PublishingImageItem";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";

interface IProps {
  offset: number;
}

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

const scrollBarWith = getScrollbarWidth();

function PublishingImagesList({ offset }: IProps) {
  const rf = useMemo(() => new CellMeasurerCache(), []);

  console.log(offset);
  const platform = usePlatform();

  const images = imagesFeed.images.get();

  if (imagesFeed.loading$.get()) {
    return <ScreenSpinner state="loading" />;
  }

  if (images.length === 0) {
    return (
      <Placeholder icon={<Icon56GhostOutline />} header="Ничего не найдено" />
    );
  }

  if (platform === Platform.VKCOM) {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      <MasonryGrid
        list={images}
        height={627}
        columnWidth={284}
        defaultHeight={400}
        defaultWidth={280}
        cellRender={(image, columnWidth, style) => (
          <PublishingImageItem
            image={image}
            columnWidth={columnWidth}
            style={style}
          />
        )}
      />
    );
  }

  const scrollBar = platform === Platform.VKCOM ? scrollBarWith : 0;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-ignore
    <AutoSizer>
      {({ height, width }) => {
        console.log(width - scrollBar - 33);
        console.log(scrollBar, "scrollBarWith");
        return (
          <List
            overscanRowCount={4}
            rowCount={images.length}
            height={height - 12 - 40}
            rowHeight={462}
            rowRenderer={({ index, key, style, parent }) => (
              <CellMeasurer cache={rf} parent={parent} index={index} key={key}>
                <PublishingImageItem
                  image={images[index]}
                  columnWidth={width - scrollBar - 33}
                  style={style}
                />
              </CellMeasurer>
            )}
            width={width - scrollBar - 33}
          />
        );
      }}
    </AutoSizer>
  );
}

export default PublishingImagesList;
