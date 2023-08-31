export type CreateMessageParams = {
  historyId: string;
  content: string;
  role: string;
  error: boolean;
  inLocal: boolean;
  isFailedModeration: boolean;
  lastUpdated: Date;
};

export type RemoteMessage = {
  id: string;
  content: string;
  role: string;
  error: boolean;
  isFailedModeration: boolean;
};
