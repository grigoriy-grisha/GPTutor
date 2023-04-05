import { Subject } from "../../utils";

export class LessonsController {
  constructor(chapters) {
    this.chapters = chapters;
    this.currentChapter$ = new Subject(null);
  }

  setCurrentChapter(index) {
    this.currentChapter$.next(this.chapters[index]);
  }
}
