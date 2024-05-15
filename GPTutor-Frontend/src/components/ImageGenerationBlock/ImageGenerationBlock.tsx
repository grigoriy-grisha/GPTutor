import React from "react";
import { classNames, Tappable } from "@vkontakte/vkui";
import { Icon48PictureOutline } from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";
import { imageService } from "$/services/ImageService";
import { StopWatch } from "$/entity/stopWatch";

import TimeLoading from "../TimeLoading/TimeLoading";

import classes from "./ImageGenerationBlock.module.css";

interface IProps {
  isEmpty: boolean;
  loading: boolean;
  heightView: number;
  widthView: number;
  url: string;
  rbg?: string;
  timer: StopWatch;
}
function ImageGenerationBlock({
  loading,
  isEmpty,
  heightView,
  widthView,
  url,
  rbg,
  timer,
}: IProps) {
  const aspectRatioPadding = (heightView / widthView) * 100;

  return (
    <>
      {isEmpty ? (
        <div
          style={{ paddingBottom: `${aspectRatioPadding}%` }}
          className={classNames(classes.image)}
        >
          <div className={classes.imagePlaceholder}>
            {loading ? (
              <TimeLoading timer={timer} />
            ) : (
              <Icon48PictureOutline width={86} height={86} />
            )}
          </div>
        </div>
      ) : (
        <Tappable
          style={{ width: "100%" }}
          hoverMode="opacity"
          activeMode="opacity"
          onClick={() => imageService.openImages([url])}
        >
          <div
            style={{
              paddingBottom: `${aspectRatioPadding}%`,
              ...(url ? { background: `rgb(${rbg})` } : {}),
            }}
            className={classNames(classes.image)}
          >
            {
              <img
                className={classNames(classes.image, classes.generatedImage)}
                src={url}
                alt="Картинка"
              />
            }
          </div>
        </Tappable>
      )}
    </>
  );
}

export default ImageGenerationBlock;
