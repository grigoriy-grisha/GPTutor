import { sig, Signal } from "dignals";

import { ModeType } from "./modeType";
import { LessonItem } from "./LessonItem";

type Lessons = { [key in string]: LessonItem[] };

export class ChapterItem {
  header = "Учебник";
  rawLessons: LessonItem[];
  lessons: Signal<Lessons>;

  systemMessage: string;

  searchValue$ = sig("");

  constructor(
    public type: ModeType,
    lessons: LessonItem[],
    systemMessage: string
  ) {
    this.type = type;
    this.rawLessons = lessons;
    this.lessons = sig(this.prepareLessons(lessons));
    this.systemMessage = systemMessage;
  }

  prepareLessons(lessons: LessonItem[]): Lessons {
    return lessons.reduce((acc, item) => {
      if (item.paragraph in acc) {
        acc[item.paragraph].push(item);
        return acc;
      }

      acc[item.paragraph] = [item];
      return acc;
    }, {} as Lessons);
  }

  findLesson(id: string) {
    return this.rawLessons.find((lesson) => lesson.id === id);
  }

  findLessonByName(name: string) {
    return this.rawLessons.find((lesson) => lesson.name === name);
  }

  searchLessons(search: string) {
    this.searchValue$.set(search);

    if (search.length < 3) {
      this.resetList();
      return;
    }

    const regExp = new RegExp(search.trim().toLowerCase(), "g");

    this.lessons.set(
      this.prepareLessons(
        this.rawLessons.filter((item) => regExp.test(item.name.toLowerCase()))
      )
    );
  }

  resetList() {
    this.lessons.set(this.prepareLessons(this.rawLessons));
  }
}
