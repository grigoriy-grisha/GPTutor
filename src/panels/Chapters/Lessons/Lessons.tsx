import React from "react";

import { Placeholder, Search, SimpleCell } from "@vkontakte/vkui";
import { Icon20ChevronRight, Icon56GhostOutline } from "@vkontakte/icons";

import { ChapterItem, LessonItem } from "$/entity/lessons";

import classes from "./Lessons.module.css";
import TertiaryTitle from "$/components/TertiaryTitle";

interface IProps {
  currentChapter: ChapterItem;
  onClickLesson: (lesson: LessonItem) => void;
}

function Lessons({ currentChapter, onClickLesson }: IProps) {
  const lessons = currentChapter.lessons.get();

  return (
    <div className={classes.lessons}>
      <Search
        onChange={({ target }) => currentChapter.searchLessons(target.value)}
        after={null}
      />
      {Object.entries(lessons).length === 0 && (
        <Placeholder
          className={classes.placeholder}
          icon={<Icon56GhostOutline />}
          header="Ничего не найдено"
        />
      )}
      {Object.entries(lessons).map(([key, value]) => (
        <React.Fragment key={key}>
          <TertiaryTitle>{key}</TertiaryTitle>
          {value.map((lesson) => (
            <SimpleCell
              key={lesson.id}
              after={<Icon20ChevronRight />}
              onClick={() => onClickLesson(lesson)}
            >
              <div>{lesson.name}</div>
            </SimpleCell>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Lessons;
