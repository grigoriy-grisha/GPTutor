import React from "react";

import { Card, Div, useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";

import { Hovered } from "$/components/Hovered";
import { ModeType } from "$/entity/lessons";

import {
  GitLesson,
  HtmlCssInterview,
  HtmlCssLesson,
  JSLesson,
  LeetCode,
  ReactLesson,
  TypescriptLesson,
  VueLessons,
} from "$/icons";

import classes from "./ChapterCard.module.css";

const CardIcon: Record<string, React.FC> = {
  [ModeType.JS]: JSLesson,
  [ModeType.Typescript]: TypescriptLesson,
  [ModeType.Vue]: VueLessons,
  [ModeType.React]: ReactLesson,
  [ModeType.Git]: GitLesson,
  [ModeType.HTMLCSS]: HtmlCssLesson,
  [ModeType.HTMLCSS_INTERWIEW]: HtmlCssInterview,
  [ModeType.LeetCode]: LeetCode,
};

interface IProps {
  chapterType: string;
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
