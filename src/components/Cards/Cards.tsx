import React, { memo } from "react";
import { Caption, HorizontalCell, HorizontalScroll } from "@vkontakte/vkui";

import { CardBlock } from "$/components/CardBlock";
import TertiaryTitle from "$/components/TertiaryTitle";

import ChapterCard from "./ChapterCard";

type CardItemType = {
  type: string;
  header: string;
};

interface IProps {
  isTop?: boolean;
  isBottom?: boolean;
  title: string;
  onClickChapter: (chapter: CardItemType) => void;
  chapters: CardItemType[];
}

function Cards({ chapters, title, isTop, isBottom, onClickChapter }: IProps) {
  return (
    <CardBlock isTop={isTop} isBottom={isBottom}>
      <TertiaryTitle>{title}</TertiaryTitle>
      <div style={{ paddingBottom: 8 }}>
        <HorizontalScroll>
          <div style={{ display: "flex" }}>
            {chapters.map((chapter, index) => (
              <HorizontalCell
                key={index}
                size="l"
                header={
                  <Caption
                    style={{ color: "var(--vkui--color_text_tertiary)" }}
                  >
                    {chapter.header}
                  </Caption>
                }
              >
                <ChapterCard
                  onClick={() => onClickChapter(chapter)}
                  chapterType={chapter.type}
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
