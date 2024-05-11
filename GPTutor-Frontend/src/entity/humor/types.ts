export type CreateHumorRequest = {
  content: string;
  type: HumorTypes;
};

export enum HumorTypes {
  poem = "poem",
  anecdote = "anecdote",
}
