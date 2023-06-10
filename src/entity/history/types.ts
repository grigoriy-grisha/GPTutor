export type HistoryCreate = {
  lastMessage: string;
  lessonName: string;
  type: string;
  systemMessage: string;
  lastUpdated: Date;
};

export type History = {
  id: string;
  lastMessage: string;
  type: string;
  lessonName: string;
  systemMessage: string;
  lastUpdated: Date;
};
