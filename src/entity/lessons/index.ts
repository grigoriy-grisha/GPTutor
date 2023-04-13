import { LessonsController } from "./LessonsController";
import { ChapterItem } from "./ChapterItem";
import { ChapterTypes } from "./chapterTypes";
import { lessonsJs } from "./lessonsItem/javascript";
import { htmlLessons } from "./lessonsItem/html";
import { gitLessons } from "./lessonsItem/git";
import { reactLessons } from "./lessonsItem/react";

export { ChapterTypes } from "./chapterTypes";

export const lessonsController = new LessonsController([
  new ChapterItem(ChapterTypes.HTMLCSS, htmlLessons),
  new ChapterItem(ChapterTypes.JS, lessonsJs),
  new ChapterItem(ChapterTypes.Git, gitLessons),
  new ChapterItem(ChapterTypes.React, reactLessons),
  new ChapterItem(ChapterTypes.Vue, []),
]);
