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
  isFailModeration: boolean;
};

export type DialogLessonData = {
  chapterType: ChapterTypes;
  lessonName: string;
};

export enum GPTDialogHistoryType {
  Free = "Free",
}

export type GPTDialogHistoryData = null | DialogLessonData;

export type GPTDialogHistory = {
  type: GPTDialogHistoryType | ChapterTypes | string;

  lessonName: string;
  id: UUID_V4;
  lastMessage: string;

  systemMessage: string;
};

export type GPTModeration = {
  id: "modr-7F6OMS2qFlEbyDJmjnY9ZLlyq5sxH";
  model: "text-moderation-004";
  results: [
    {
      flagged: boolean;
      categories: {
        sexual: boolean;
        hate: boolean;
        violence: boolean;
        "self-harm": boolean;
        "sexual/minors": boolean;
        "hate/threatening": boolean;
        "violence/graphic": boolean;
      };
      category_scores: {
        sexual: number;
        hate: number;
        violence: number;
        "self-harm": number;
        "sexual/minors": number;
        "hate/threatening": number;
        "violence/graphic": number;
      };
    }
  ];
};
