import * as React from "react";

import { classNames, IconButton } from "@vkontakte/vkui";
import { Icon28ReportOutline } from "@vkontakte/icons";

import { imagesFeed } from "$/entity/image/imagesFeed";
import { ImageFeed } from "$/entity/image/ImageFeed";

import classes from "./Report.module.css";

interface IProps {
  image: ImageFeed;
}

function Report({ image }: IProps) {
  return (
    <IconButton
      onClick={() => {
        imagesFeed.createComplaint(image.image$.get().id);
      }}
      className={classNames(classes.defaultm, {
        [classes.isActive]: image.isComplaint(),
      })}
    >
      <Icon28ReportOutline />
    </IconButton>
  );
}

export default Report;
