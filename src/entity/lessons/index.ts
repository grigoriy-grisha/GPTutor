import { LessonsController } from "./LessonsController";
import { LessonItem } from "./LessonItem";
import { LessonRequest } from "./LessonRequest";
import { ChapterItem } from "./ChapterItem";
import { ChapterTypes } from "./chapterTypes";
export { ChapterTypes } from "./chapterTypes";

import { lessonsJs } from "./lessonsItem/javascript";
import { htmlLessons } from "./lessonsItem/html";


export const lessonsController = new LessonsController([
  new ChapterItem(ChapterTypes.HTMLCSS, htmlLessons),
  new ChapterItem(ChapterTypes.JS, lessonsJs),
  new ChapterItem(ChapterTypes.Git, [
    new LessonItem(
      "Переменные const, let и var",
      "Тема",
      new LessonRequest(
        "Объясни переменные const, let и var, в чем их отличия и покажи примеры",
        "Переменные const, let и var"
      ),
      [
        new LessonRequest(
          "Объясни подробнее const, укажи примеры",
          "Переменные const"
        ),
        new LessonRequest(
          "Объясни подробнее let, укажи примеры",
          "Переменные let"
        ),
        new LessonRequest(
          "Объясни подробнее var, укажи примеры",
          "Переменные var"
        ),
        new LessonRequest("В чем отличия let от var?"),
        new LessonRequest("Когда лучше использовать let, const, var?"),
      ]
    ),
  ]),
  new ChapterItem(ChapterTypes.React, [
    new LessonItem(
      "Переменные const, let и var",
      "Тема",
      new LessonRequest(
        "Объясни переменные const, let и var, в чем их отличия и покажи примеры",
        "Переменные const, let и var"
      ),
      [
        new LessonRequest(
          "Объясни подробнее const, укажи примеры",
          "Переменные const"
        ),
        new LessonRequest(
          "Объясни подробнее let, укажи примеры",
          "Переменные let"
        ),
        new LessonRequest(
          "Объясни подробнее var, укажи примеры",
          "Переменные var"
        ),
        new LessonRequest("В чем отличия let от var?"),
        new LessonRequest("Когда лучше использовать let, const, var?"),
      ]
    ),
  ]),
  new ChapterItem(ChapterTypes.Vue, [
    new LessonItem(
      "Переменные const, let и var",
      "Тема",
      new LessonRequest(
        "Объясни переменные const, let и var, в чем их отличия и покажи примеры",
        "Переменные const, let и var"
      ),
      [
        new LessonRequest(
          "Объясни подробнее const, укажи примеры",
          "Переменные const"
        ),
        new LessonRequest(
          "Объясни подробнее let, укажи примеры",
          "Переменные let"
        ),
        new LessonRequest(
          "Объясни подробнее var, укажи примеры",
          "Переменные var"
        ),
        new LessonRequest("В чем отличия let от var?"),
        new LessonRequest("Когда лучше использовать let, const, var?"),
      ]
    ),
  ]),
]);
