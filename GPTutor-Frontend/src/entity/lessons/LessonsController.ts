import { sig } from "dignals";

import { ModeType } from "./modeType";
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

  setCurrentLessonByName(name: string) {
    const foundLesson = this.currentChapter.get()?.findLessonByName(name);
    if (!foundLesson) return;

    this.currentLesson.set(foundLesson);
  }

  setCurrentChapter(chapterType: ModeType) {
    const chapter = this.chapters.find(
      (chapter) => chapter.type === chapterType
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
