export type GenerateImageRequest = {
  modelId: string;
  prompt: string;
  originalPrompt: string;
  createdAt: Date;
  guidanceScale: number;
  expireTimestamp: Date;
  width: number;
  height: number;
  samples: number;
  scheduler: string;
  negativePrompt: string;
  seed: null | string;
  numInferenceSteps: number;
  upscale: "no" | "yes";
};

export type ImageExample = {
  url: string;
  seed: number | null;
  numInferenceSteps: number;
  prompt: string;
  guidanceScale: number;
  scheduler: string;
  modelId: string;
  negativePrompt: string;
};

export type GeneratedImage = {
  aspectRatio: string;
  guidanceScale: number;
  createdAt: string;
  expire: string | null;
  id: string;
  modelId: string;
  negativePrompt: string;
  prompt: string;
  seed: null | string;
  generatedSeed: null | string;
  numInferenceSteps: number;
  width: number;
  height: number;
  url: string;
  scheduler: string;
  upscale: "no" | "yes";
};

export enum ImageAspectRatio {
  square = "square",
  portrait = "portrait",
  landscape = "landscape",
  custom = "custom",
}

export const emptyImageGenerated: GeneratedImage = {
  expire: "",
  id: String(Math.random()),
  url: "",
  modelId: "",
  prompt: "",
  createdAt: "",
  guidanceScale: -1,
  aspectRatio: ImageAspectRatio.square,
  width: 1,
  height: 1,
  scheduler: "",
  negativePrompt: "",
  seed: "",
  numInferenceSteps: 1,
  upscale: "no",
  generatedSeed: "",
};
