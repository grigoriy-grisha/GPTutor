import { Subject } from "../../utils";

export class ChapterItem {
  constructor(chapterType, lessons) {
    this.chapterType = chapterType;
    this.lessons = lessons;
    this.currentLesson$ = new Subject(null);
  }

  setCurrentLesson(index) {
    this.currentLesson$.next(this.lessons[index]);
  }
}
