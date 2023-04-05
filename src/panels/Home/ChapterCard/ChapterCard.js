import { Card, Div, useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";

import { chapterTypes } from "../../../entity/lessons";
import JSLesson from "../../../icons/JSLesson";
import ReactLesson from "../../../icons/ReactLesson";
import { Hovered } from "../../../components/Hovered";

const CardIcon = {
  [chapterTypes.JS]: JSLesson,
  [chapterTypes.React]: ReactLesson,
};

function ChapterCard({ chapterType, onClick }) {
  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const Icon = CardIcon[chapterType];

  return (
    <Card
      onClick={onClick}
      mode="shadow"
      style={{
        background: "var(--vkui--color_background_accent_themed)",
      }}
    >
      <Hovered
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Div
          style={{
            height: sizeX === "compact" ? 144 : 192,
            display: "flex",
          }}
        >
          {<Icon />}
        </Div>
      </Hovered>
    </Card>
  );
}

export default ChapterCard;
