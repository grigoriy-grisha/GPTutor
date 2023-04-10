import { LessonsController } from "./LessonsController";
import { LessonItem } from "./LessonItem";
import { LessonRequest } from "./LessonRequest";
import { ChapterItem } from "./ChapterItem";
import { chapterTypes } from "./chapterTypes";
export { chapterTypes } from "./chapterTypes";

import { lessonsJs } from "./lessonsItem/javascript";

export const lessonsController = new LessonsController([
  new ChapterItem(chapterTypes.HTMLCSS, [
    new LessonItem(
      "Переменные const, let и var",
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
  new ChapterItem(chapterTypes.JS, lessonsJs),
  new ChapterItem(chapterTypes.Git, [
    new LessonItem(
      "Переменные const, let и var",
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
  new ChapterItem(chapterTypes.React, [
    new LessonItem(
      "Переменные const, let и var",
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
  new ChapterItem(chapterTypes.Vue, [
    new LessonItem(
      "Переменные const, let и var",
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
