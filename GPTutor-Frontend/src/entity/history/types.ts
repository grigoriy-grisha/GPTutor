export type HistoryCreate = {
  lastMessage: string;
  lessonName: string;
  type: string;
  systemMessage: string;
  lastUpdated: Date;
  title?: string;
};

export type History = {
  id: string;
  lastMessage: string;
  type: string;
  lessonName: string;
  systemMessage: string;
  title?: string;
  lastUpdated: Date;
};
