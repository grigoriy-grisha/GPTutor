import { sig } from "dignals";

import { LessonItem } from "./LessonItem";
import { ChapterItem } from "./ChapterItem";
import { UUID_V4 } from "../common";
import { ChapterTypes } from "$entity/lessons/chapterTypes";

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

  setCurrentChapter(chapterType: ChapterTypes) {
    const chapter = this.chapters.find(
      (chapter) => chapter.chapterType === chapterType
    );
    if (chapter) this.currentChapter.set(chapter);
  }

  clearChapter() {
    this.currentChapter.set(null);
  }

  clearLesson() {
    this.currentLesson.set(null);
  }
}
