import React from "react";

import { Card, Div, useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";

import { Hovered } from "$/components/Hovered";
import { ModeType } from "$/entity/lessons";

import {
  GitLesson,
  GoLesson,
  HtmlCssInterview,
  HtmlCssLesson,
  JavascriptInterview,
  JSLesson,
  JSTraining,
  LeetCode,
  ReactInterview,
  ReactLesson,
  TypescriptLesson,
  VueLesson,
} from "$/icons";

import classes from "./ChapterCard.module.css";
import { PythonTraining } from "$/icons/LessonIcons/PythonTraining";
import { GoTraining } from "$/icons/LessonIcons/GoTraining";

const CardIcon: Record<string, React.FC> = {
  [ModeType.JS]: JSLesson,
  [ModeType.Typescript]: TypescriptLesson,
  [ModeType.React]: ReactLesson,
  [ModeType.Vue]: VueLesson,
  [ModeType.Go]: GoLesson,
  [ModeType.Git]: GitLesson,
  [ModeType.HTMLCSS]: HtmlCssLesson,
  [ModeType.HTMLCSS_INTERVIEW]: HtmlCssInterview,
  [ModeType.REACT_INTERVIEW]: ReactInterview,
  [ModeType.JAVASCRIPT_INTERVIEW]: JavascriptInterview,
  [ModeType.LeetCode]: LeetCode,
  [ModeType.JS_TRAINING]: JSTraining,
  [ModeType.PYTHON_TRAINING]: PythonTraining,
  [ModeType.GO_TRAINING]: GoTraining,
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
