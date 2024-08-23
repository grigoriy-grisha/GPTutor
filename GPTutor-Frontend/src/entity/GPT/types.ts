import { ModeType } from "$/entity/lessons";

export enum GPTRoles {
  user = "user",
  assistant = "assistant",
  system = "system",
}

export type DialogLessonData = {
  chapterType: ModeType;
  lessonName: string | null;
};

export enum GPTDialogHistoryType {
  Free = "Free",
}

export type GPTDialogHistoryData = null | DialogLessonData;

export type GPTModeration = {
  id: string;
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

interface DocumentVKDocMetadata {
  description?: string;
  language?: string;
  source?: string;
  pageTitle?: string;
  link?: string;
  time?: number;
  url?: string;
}

export interface DocumentVKDoc {
  metadata: DocumentVKDocMetadata;
  pageContent: string;
}

export interface VkDocsResponse {
  documents: DocumentVKDoc[];
  generation: string;
  question: string;
}
