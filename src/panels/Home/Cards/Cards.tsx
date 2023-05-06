import React, { memo } from "react";
import { HorizontalCell, HorizontalScroll } from "@vkontakte/vkui";

import { ChapterItem, lessonsController } from "$/entity/lessons";
import { CardBlock } from "$/components/CardBlock";
import TertiaryTitle from "$/components/TertiaryTitle";

import ChapterCard from "./ChapterCard";

interface IProps {
  onClickChapter: (chapter: ChapterItem) => void;
}

function Cards({ onClickChapter }: IProps) {
  return (
    <CardBlock isTop>
      <TertiaryTitle>Темы для изучения</TertiaryTitle>
      <div style={{ paddingBottom: 8 }}>
        <HorizontalScroll>
          <div style={{ display: "flex" }}>
            {lessonsController.chapters.map((chapter, index) => (
              <HorizontalCell key={index} size="l">
                <ChapterCard
                  onClick={() => onClickChapter(chapter)}
                  chapterType={chapter.chapterType}
                />
              </HorizontalCell>
            ))}
          </div>
        </HorizontalScroll>
      </div>
    </CardBlock>
  );
}

export default memo(Cards);
