export enum GPTRoles {
  user = "user",
  assistant = "assistant",
}

export type GPTMessage = {
  content: string;
  role: GPTRoles;
  inLocal: boolean;
};
