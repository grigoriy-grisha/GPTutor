import { User } from "$/entity/user/types";

export type CreateHumorRequest = {
  content: string;
  type: HumorTypes;
  imageUrl: string;
};

export enum HumorTypes {
  poem = "poem",
  anecdote = "anecdote",
}

export interface HumorEntityLikes {
  id: string;
  vkUser: User;
}

export interface HumorItem {
  id: string;
  vkUser: User;
  content: string;
  imageUrl: string;
  type: string;
  createdAt: string;
  humorEntityLikes: HumorEntityLikes[];
}
