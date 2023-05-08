import { UUID_V4 } from "$/entity/common";
import { ChapterTypes } from "$/entity/lessons";

export enum GPTRoles {
  user = "user",
  assistant = "assistant",
  system = "system",
}

export type GPTMessage = {
  content: string;
  role: GPTRoles;
  inLocal: boolean;
};

export type DialogLessonData = {
  chapterType: ChapterTypes;
  lessonName: string;
};

export enum GPTDialogHistoryType {
  Free = "Free",
  Lesson = "Lesson",
}

export type GPTDialogHistoryData = null | DialogLessonData;

export type GPTDialogHistory = {
  data: GPTDialogHistoryData;
  type: GPTDialogHistoryType;
  id: UUID_V4;
  date: Date;
  lastMessage: GPTMessage;

  systemMessage: GPTMessage;
  messages: GPTMessage[];
};
