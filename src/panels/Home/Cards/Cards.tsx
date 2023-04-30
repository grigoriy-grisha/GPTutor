import React, { memo } from "react";
import { Header, HorizontalCell, HorizontalScroll } from "@vkontakte/vkui";

import { lessonsController } from "$/entity/lessons";
import { CardBlock } from "$/components/CardBlock";
import { ChapterItem } from "$/entity/lessons/ChapterItem";

import ChapterCard from "./ChapterCard";

interface IProps {
  onClickChapter: (chapter: ChapterItem) => void;
}

function Cards({ onClickChapter }: IProps) {
  return (
    <CardBlock isTop>
      <Header mode="tertiary">Темы для изучения</Header>
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
