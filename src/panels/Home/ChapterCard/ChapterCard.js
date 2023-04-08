import { Card, Div, useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";

import { chapterTypes } from "../../../entity/lessons";
import JSLesson from "../../../icons/JSLesson";
import ReactLesson from "../../../icons/ReactLesson";
import { Hovered } from "../../../components/Hovered";
import { JSCommonLesson } from "../../../icons/JSCommonLesson";

import classes from "./ChapterCard.module.css";

const CardIcon = {
  [chapterTypes.JSCommon]: JSCommonLesson,
  [chapterTypes.JSAdvanced]: JSLesson,
  [chapterTypes.React]: ReactLesson,
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
