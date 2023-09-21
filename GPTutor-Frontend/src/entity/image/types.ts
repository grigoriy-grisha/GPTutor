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
  expireTimestamp: Date;
};

export type ImageExample = {
  url: string;
  seed: number;
  steps: number;
  prompt: string;
  cfgScale: number;
  sampler: string;
  model: string;
  negativePrompt: string;
};

export type GeneratedImage = {
  aspectRatio: string;
  cfgScale: number;
  createdAt: string;
  expire: string | null;
  id: string;
  model: string;
  negativePrompt: string;
  prompt: string;
  sampler: string;
  seed: number;
  steps: number;
  url: string;
};

export enum ImageAspectRatio {
  square = "square",
  portrait = "portrait",
  landscape = "landscape",
}
