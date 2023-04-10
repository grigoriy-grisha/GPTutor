import { Subject } from "../../utils";

export class LessonsController {
  constructor(chapters) {
    this.chapters = chapters;
    this.currentChapter$ = new Subject(null);
    this.currentLesson$ = new Subject(null);
  }

  setCurrentLesson(id) {
    const foundLesson = this.currentChapter$.getValue().findLesson(id);
    if (!foundLesson) return;

    this.currentLesson$.next(foundLesson);
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
