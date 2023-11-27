import { ContentCard } from "$/components/ContentCard";
import classes from "$/panels/PublishingImages/PublishingImages.module.css";
import {
  classNames,
  IconButton,
  Platform,
  Subhead,
  usePlatform,
} from "@vkontakte/vkui";
import { imagesFeed } from "$/entity/image/imagesFeed";
import { Icon28ReportOutline } from "@vkontakte/icons";
import * as React from "react";
import { ImageFeed } from "$/entity/image/ImageFeed";
import { Like } from "$/panels/PublishingImages/PublishingImageItem/Like";

interface IProps {
  image: ImageFeed;
  columnWidth: number;
  style?: React.CSSProperties;
}

function PublishingImageItem({ image: imageFeed, style, columnWidth }: IProps) {
  const image = imageFeed.image$.get();

  const platform = usePlatform();

  return (
    <div
      style={style}
      className={classNames({
        [classes.mobileContainer]: platform !== Platform.VKCOM,
      })}
    >
      <ContentCard
        imgBackground={`rgb(${image.rbg})`}
        imgBlur={imageFeed.isComplaint()}
        maxHeight={
          platform === Platform.VKCOM
            ? (columnWidth * image.height) / image.width
            : 450 - 110
        }
        style={{
          width: columnWidth,
        }}
        className={classNames(classes.item, {
          [classes.disableContent]: imageFeed.isComplaint(),
        })}
        onClick={() => {}}
        key={image.url}
        src={image.url}
        alt={image.prompt}
        header={
          <div style={{ maxHeight: 86, minHeight: 86 }}>
            <div className={classes.itemContent}>
              <div className={classes.itemText}>{image.prompt}</div>
              <div className={classes.itemActions}>
                <Like image={imageFeed} />
                <IconButton
                  onClick={() => {
                    console.log(image);
                    imagesFeed.createComplaint(image.id);
                  }}
                  style={{
                    color: imageFeed.isComplaint()
                      ? "var(--vkui--color_background_negative)"
                      : "var(--vkui--color_text_accent_themed)",
                  }}
                >
                  <Icon28ReportOutline width={20} height={20} />
                </IconButton>
              </div>
            </div>
            <Subhead className={classes.itemSubhead}>{image.modelId}</Subhead>
          </div>
        }
      />
    </div>
  );
}

export default PublishingImageItem;
