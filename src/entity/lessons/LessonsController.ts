import { sig } from "dignals";

import { LessonItem } from "./LessonItem";
import { ChapterItem } from "./ChapterItem";
import { UUID_V4 } from "../common";

export class LessonsController {
  public currentChapter = sig<ChapterItem | null>(null);
  public currentLesson = sig<LessonItem | null>(null);

  constructor(public chapters: ChapterItem[]) {
    this.chapters = chapters;
  }

  setCurrentLesson(id: UUID_V4) {
    const foundLesson = this.currentChapter.get()?.findLesson(id);
    if (!foundLesson) return;

    this.currentLesson.set(foundLesson);
  }

  setCurrentChapter(index: number) {
    this.currentChapter.set(this.chapters[index]);
  }

  clearChapter() {
    this.currentChapter.set(null);
  }

  clearLesson() {
    this.currentLesson.set(null);
  }
}
