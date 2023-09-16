export type GenerateImageRequest = {
  model: string;
  prompt: string;
  createdAt: Date;
  sampler: string;
  negativePrompt: string;
  cfgScale: number;
  seed: number;
  steps: number;
  aspectRatio: ImageAspectRatio;
};

export type GeneratedImage = {
  createdAt: string;
  id: string;
  model: string;
  objectId: string;
  prompt: string;
};

export enum ImageAspectRatio {
  square = "square",
  portrait = "portrait",
  landscape = "landscape",
}
