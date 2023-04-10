import { Subject } from "../../utils";

export class ChapterItem {
  constructor(chapterType, lessons) {
    this.chapterType = chapterType;
    this.rawLessons = lessons;
    this.lessons$ = new Subject(this.prepareLessons(lessons));
  }

  prepareLessons(lessons) {
    return lessons.reduce((acc, item) => {
      if (item.paragraph in acc) {
        acc[item.paragraph].push(item);
        return acc;
      }

      acc[item.paragraph] = [item];
      return acc;
    }, {});
  }

  findLesson(id) {
    return this.rawLessons.find((lesson) => lesson.id === id);
  }

  searchLessons(search) {
    if (search.length < 3) {
      this.lessons$.next(this.prepareLessons(this.rawLessons));
      return;
    }

    const regExp = new RegExp(search.toLowerCase(), "g");

    this.lessons$.next(
      this.prepareLessons(
        this.rawLessons.filter((item) => regExp.test(item.name.toLowerCase()))
      )
    );
  }
}
