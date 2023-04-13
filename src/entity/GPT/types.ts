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
