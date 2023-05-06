import { LessonsController } from "./LessonsController";
import { ChapterItem } from "./ChapterItem";
import { ChapterTypes } from "./chapterTypes";
import { lessonsJs } from "./lessonsItem/javascript";
import { htmlLessons } from "./lessonsItem/html";
import { gitLessons } from "./lessonsItem/git";
import { reactLessons } from "./lessonsItem/react";
import { typescriptLessons } from "./lessonsItem/typescript";

export * from "./LessonsController";
export * from "./ChapterItem";
export * from "./chapterTypes";
export * from "./LessonItem";
export * from "./LessonRequest";
export * from "./lessonsItem/javascript";
export * from "./lessonsItem/html";
export * from "./lessonsItem/git";
export * from "./lessonsItem/react";

export { ChapterTypes } from "./chapterTypes";

export const lessonsController = new LessonsController([
  new ChapterItem(ChapterTypes.HTMLCSS, htmlLessons),
  new ChapterItem(ChapterTypes.JS, lessonsJs),
  new ChapterItem(ChapterTypes.Typescript, typescriptLessons),
  new ChapterItem(ChapterTypes.React, reactLessons),
  new ChapterItem(ChapterTypes.Git, gitLessons),
]);
