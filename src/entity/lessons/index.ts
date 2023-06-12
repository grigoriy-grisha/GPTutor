import { LessonsController } from "./LessonsController";
import { ChapterItem } from "./ChapterItem";
import { ModeType } from "./modeType";
import { lessonsJs } from "./lessonsItem/javascript";
import { htmlLessons } from "./lessonsItem/html";
import { gitLessons } from "./lessonsItem/git";
import { reactLessons } from "./lessonsItem/react";
import { typescriptLessons } from "./lessonsItem/typescript";

export * from "./LessonsController";
export * from "./ChapterItem";
export * from "./modeType";
export * from "./LessonItem";
export * from "./LessonRequest";
export * from "./lessonsItem/javascript";
export * from "./lessonsItem/html";
export * from "./lessonsItem/git";
export * from "./lessonsItem/react";

export { ModeType } from "./modeType";

export const languages = [
  new ChapterItem(ModeType.HTMLCSS, htmlLessons),
  new ChapterItem(ModeType.JS, lessonsJs),
  new ChapterItem(ModeType.Typescript, typescriptLessons),
];

export const technologies = [
  new ChapterItem(ModeType.React, reactLessons),
  new ChapterItem(ModeType.Git, gitLessons),
];

export const lessonsController = new LessonsController([
  ...languages,
  ...technologies,
]);
