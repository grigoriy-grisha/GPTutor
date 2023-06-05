import { User } from "$/entity/user/types";

export type HistoryCreate = {
  userVkId: string;
  lastMessage: string;
  lessonName: string;
  type: string;
  systemMessage: string;
  lastUpdated: Date;
};

export type History = {
  id: string;
  vkUser: User;
  lastMessage: string;
  type: string;
  lessonName: string;
  systemMessage: string;
  lastUpdated: Date;
};
