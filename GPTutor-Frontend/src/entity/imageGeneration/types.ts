export type GenerateImageRequest = {
  model: string;
  prompt: string;
  createdAt: Date;
};

export type GeneratedImage = {
  createdAt: string;
  id: string;
  model: string;
  objectId: string;
  prompt: string;
};
