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
  loraModel: string;
};

export type ImageExample = {
  originalPrompt?: string;
  url: string;
  seed: string | null;
  numInferenceSteps: number;
  prompt: string;
  guidanceScale: number;
  scheduler: string;
  modelId: string;
  negativePrompt: string;
};

export type GeneratedImage = {
  originalPrompt: string;
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
  rbg: string;
  scheduler: string;
  upscale: "no" | "yes";
  complaints: ImageComplaint[];
  imageLikes: ImageLikes[];
};

export enum ImageAspectRatio {
  square = "square",
  portrait = "portrait",
  landscape = "landscape",
  custom = "custom",
}

export const emptyImageGenerated: GeneratedImage = {
  complaints: [],
  imageLikes: [],
  rbg: "",
  originalPrompt: "",
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

export type ImageComplaint = {
  id: string;
  vkUser: {
    id: string;
    vkId: string;
  };
  createdAt: string;
};

export type ImageLikes = {
  id: string;
  vkUser: {
    id: string;
    vkId: string;
  };
  createdAt: string;
};
