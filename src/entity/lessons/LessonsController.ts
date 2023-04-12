import { Subject } from "../../utils";
import { LessonItem } from "./LessonItem";
import { ChapterItem } from "./ChapterItem";
import { UUID_V4 } from "../common";

export class LessonsController {
  public currentChapter$: Subject<ChapterItem | null>;
  public currentLesson$: Subject<LessonItem | null>;

  constructor(public chapters: ChapterItem[]) {
    this.chapters = chapters;
    this.currentChapter$ = new Subject(null);
    this.currentLesson$ = new Subject(null);
  }

  setCurrentLesson(id: UUID_V4) {
    const foundLesson = this.currentChapter$.getValue()?.findLesson(id);
    if (!foundLesson) return;

    this.currentLesson$.next(foundLesson);
  }

  setCurrentChapter(index: number) {
    this.currentChapter$.next(this.chapters[index]);
  }

  clearChapter() {
    this.currentChapter$.next(null);
  }

  clearLesson() {
    this.currentLesson$.next(null);
  }
}
