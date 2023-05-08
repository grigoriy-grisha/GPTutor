import { sig, Signal } from "dignals";

import { ChapterTypes } from "./chapterTypes";
import { LessonItem } from "./LessonItem";

type Lessons = { [key in string]: LessonItem[] };

export class ChapterItem {
  rawLessons: LessonItem[];
  lessons: Signal<Lessons>;

  constructor(public chapterType: ChapterTypes, lessons: LessonItem[]) {
    this.chapterType = chapterType;
    this.rawLessons = lessons;
    this.lessons = sig(this.prepareLessons(lessons));
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
    if (search.length < 3) {
      this.lessons.set(this.prepareLessons(this.rawLessons));
      return;
    }

    const regExp = new RegExp(search.toLowerCase(), "g");

    this.lessons.set(
      this.prepareLessons(
        this.rawLessons.filter((item) => regExp.test(item.name.toLowerCase()))
      )
    );
  }
}
