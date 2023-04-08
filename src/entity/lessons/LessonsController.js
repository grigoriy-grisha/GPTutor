import { Subject } from "../../utils";

export class LessonsController {
  constructor(chapters) {
    this.chapters = chapters;
    this.currentChapter$ = new Subject(null);
    this.currentLesson$ = new Subject(null);
  }

  setCurrentLesson(index) {
    this.currentLesson$.next(this.currentChapter$.getValue().lessons[index]);
  }

  setCurrentChapter(index) {
    this.currentChapter$.next(this.chapters[index]);
  }

  clearChapter() {
    this.currentChapter$.next(null);
  }

  clearLesson() {
    this.currentLesson$.next(null);
  }
}
