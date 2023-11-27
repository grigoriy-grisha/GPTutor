import * as React from "react";
import { classNames, IconButton } from "@vkontakte/vkui";
import {
  Icon20LikeCircleFillGray,
  Icon20LikeCircleFillRed,
} from "@vkontakte/icons";

import classes from "./Like.module.css";
import { ImageFeed } from "$/entity/image/ImageFeed";
import { imagesFeed } from "$/entity/image/imagesFeed";

interface IProps {
  image: ImageFeed;
}

function Like({ image }: IProps) {
  return <div></div>;
  // return (
  // <IconButton
  //   onClick={() => {
  //     imagesFeed.createImageLike(image.image$.get().id);
  //   }}
  // >
  //   <div
  //     className={classNames(classes.default, {
  //       [classes.isActive]: image.isLike(),
  //     })}
  //   >
  //     {image.image$.get().imageLikes.length}
  //     {image.isLike() ? (
  //       <Icon20LikeCircleFillRed />
  //     ) : (
  //       <Icon20LikeCircleFillGray />
  //     )}
  //   </div>
  // </IconButton>
  // );
}

export default Like;
