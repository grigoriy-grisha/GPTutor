import React from "react";

import { Card, Div, useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";

import { ChapterTypes } from "../../../entity/lessons";

import {
  VueLessons,
  GitLesson,
  ReactLesson,
  JSLesson,
  HtmlCssLesson,
} from "../../../icons";

import { Hovered } from "../../../components/Hovered";

import classes from "./ChapterCard.module.css";

const CardIcon: Record<ChapterTypes, React.FC> = {
  [ChapterTypes.JS]: JSLesson,
  [ChapterTypes.Vue]: VueLessons,
  [ChapterTypes.React]: ReactLesson,
  [ChapterTypes.Git]: GitLesson,
  [ChapterTypes.HTMLCSS]: HtmlCssLesson,
};

interface IProps {
  chapterType: ChapterTypes;
  onClick: () => void;
}

function ChapterCard({ chapterType, onClick }: IProps) {
  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const Icon = CardIcon[chapterType];

  return (
    <Card onClick={onClick} mode="shadow" className={classes.card}>
      <Hovered>
        <Div
          className={classes.div}
          style={{ height: sizeX === "compact" ? 144 : 192 }}
        >
          {<Icon />}
        </Div>
      </Hovered>
    </Card>
  );
}

export default ChapterCard;
