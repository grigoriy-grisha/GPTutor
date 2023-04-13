import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const FOR_BEGINNERS = "Для новичоков";

export const vueLessons = [
  [
    new LessonItem(
      "Что такое Vue?",
      FOR_BEGINNERS,
      new LessonRequest("Что такое Vue? Какую проблему решает?"),
      [
        new LessonRequest(
          "Первое Vue приложение",
          "Как создать своей первое Vue приложение"
        ),
      ]
    ),
    new LessonItem(
      "Шаблоны",
      FOR_BEGINNERS,
      new LessonRequest("Что такое шаблоны в Vue?"),
      [
        new LessonRequest(
          "Как vue декларативно отображает данные?",
          "Декларативная отрисовка"
        ),
      ]
    ),
    new LessonItem(
      "Условия в шаблоне",
      FOR_BEGINNERS,
      new LessonRequest(
        "Как отобразить что уловно в шаблоне vue? Покажи пример"
      ),
      [new LessonRequest("Объясни v-if во Vue?", "v-if")]
    ),
    new LessonItem(
      "Циклы в шаблоне",
      FOR_BEGINNERS,
      new LessonRequest(
        "Как отобразить что уловно в шаблоне vue? Покажи пример"
      ),
      [new LessonRequest("Объясни v-if во Vue?", "v-if")]
    ),
  ],
];
