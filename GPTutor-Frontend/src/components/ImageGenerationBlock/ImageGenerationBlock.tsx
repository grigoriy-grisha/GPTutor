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
  isDisableHover?: boolean;
  heightView: number;
  widthView: number;
  url: string;
  rbg?: string;
  timer?: StopWatch;
}
function ImageGenerationBlock({
  loading,
  isEmpty,
  heightView,
  widthView,
  isDisableHover,
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
              <>{timer ? <TimeLoading timer={timer} /> : null}</>
            ) : (
              <Icon48PictureOutline width={86} height={86} />
            )}
          </div>
        </div>
      ) : (
        <Tappable
          style={{ width: "100%", cursor: isDisableHover ? "none" : "pointer" }}
          hoverMode={isDisableHover ? "none" : "opacity"}
          activeMode={isDisableHover ? "none" : "opacity"}
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
