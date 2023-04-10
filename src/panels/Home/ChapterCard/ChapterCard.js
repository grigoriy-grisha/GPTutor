import { Card, Div, useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";

import { chapterTypes } from "../../../entity/lessons";

import {
  VueLessons,
  GitLesson,
  ReactLesson,
  JSLesson,
  HtmlCssLesson,
} from "../../../icons";

import classes from "./ChapterCard.module.css";

import { Hovered } from "../../../components/Hovered";

const CardIcon = {
  [chapterTypes.JS]: JSLesson,
  [chapterTypes.Vue]: VueLessons,
  [chapterTypes.React]: ReactLesson,
  [chapterTypes.Git]: GitLesson,
  [chapterTypes.HTMLCSS]: HtmlCssLesson,
};

function ChapterCard({ chapterType, onClick }) {
  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const Icon = CardIcon[chapterType];

  return (
    <Card onClick={onClick} mode="shadow" className={classes.card}>
      <Hovered className={classes.hovered}>
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
