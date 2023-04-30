import React from "react";

import {
  Banner,
  Header,
  HorizontalCell,
  HorizontalScroll,
} from "@vkontakte/vkui";

import { ChapterTypes } from "$/entity/lessons";
import { CardBlock } from "$/components/CardBlock";

import { stackData } from "./stackData";
import classes from "./Stack.module.css";

interface IProps {
  onClickStack: (chapter?: ChapterTypes) => void;
}

function Stack({ onClickStack }: IProps) {
  return (
    <CardBlock isTop>
      <Header mode="tertiary">Стек технологий</Header>
      <HorizontalScroll>
        <div style={{ display: "flex" }}>
          {stackData.map(({ icon, header, chapter, href }, index) => (
            <HorizontalCell
              target="_blank"
              disabled
              size="l"
              key={index}
              href={href}
            >
              <Banner
                onClick={() => onClickStack(chapter)}
                className={classes.stackBlock}
                asideMode="expand"
                before={icon}
                header={header}
              />
            </HorizontalCell>
          ))}
        </div>
      </HorizontalScroll>
    </CardBlock>
  );
}

export default Stack;
