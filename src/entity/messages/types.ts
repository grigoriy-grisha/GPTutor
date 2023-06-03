export type CreateMessageParams = {
  historyId: string;
  content: string;
  role: string;
  isError: boolean;
  isFailedModeration: boolean;
};

export type RemoteMessage = {
  id: string;
  content: string;
  role: string;
  isError: boolean;
  isFailedModeration: boolean;
};
