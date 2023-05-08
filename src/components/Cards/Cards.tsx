import React, { memo } from "react";
import { HorizontalCell, HorizontalScroll } from "@vkontakte/vkui";

import { ChapterItem } from "$/entity/lessons";
import { CardBlock } from "$/components/CardBlock";
import TertiaryTitle from "$/components/TertiaryTitle";

import ChapterCard from "./ChapterCard";

interface IProps {
  isTop?: boolean;
  title: string;
  onClickChapter: (chapter: ChapterItem) => void;
  chapters: ChapterItem[];
}

function Cards({ chapters, title, isTop, onClickChapter }: IProps) {
  return (
    <CardBlock isTop={isTop}>
      <TertiaryTitle>{title}</TertiaryTitle>
      <div style={{ paddingBottom: 8 }}>
        <HorizontalScroll>
          <div style={{ display: "flex" }}>
            {chapters.map((chapter, index) => (
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
