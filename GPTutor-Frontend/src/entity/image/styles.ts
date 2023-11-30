export const styles = [
  {
    value: "sd",
    imageName: "universal.png",
    label: "Универсальный",
  },
  {
    value: "realistic-vision-v40",
    imageName: "realystic-vision.png",
    label: "Реалистичный",
  },
  {
    value: "anything-v3",
    imageName: "anything-4.png",
    label: "Аниме",
  },
  {
    value: "samaritan-3d-cartoon",
    imageName: "3D-toon.png",
    label: "3D мультик",
  },
  {
    value: "food-crit",
    imageName: "creepy.png",
    label: "Чудовища",
    loraModel: "",
  },
  {
    value: "anything-v3",
    imageName: "maf.jpg",
    loraModel: "maf",
    label: "Maf",
  },

  {
    value: "dream-shaper-8797",
    imageName: "hacked-tech.png",
    loraModel: "hacked-tech",
    label: "Hacked Tech",
  },

  {
    value: "lowpoly-diffusion",
    imageName: "lowpoly.png",
    label: "Low poly",
  },
  {
    value: "pixel-sprite",
    imageName: "sprite.png",
    label: "Пиксель спрайты",
  },
  {
    value: "vector-art",
    imageName: "vector.png",
    label: "Векторный",
  },
  {
    value: "synthwave-diffusion",
    imageName: "SynthwavePunk.png",
    label: "SynthwavePunk",
  },
  {
    value: "midjourney-papercut",
    imageName: "paper.png",
    label: "Бумажный",
  },
  {
    value: "icons-diffusion",
    imageName: "icons.png",
    label: "Иконки",
  },
  {
    value: "woolitize-diffusion",
    imageName: "woolitize.png",
    label: "Плюшевый",
  },
];

export const models = [
  {
    value: "sd",
    label: "Stable Diffusion 1.5",
  },

  {
    value: "f222-diffusion",
    label: "F222 Diffusion",
  },
  {
    value: "dream-shaper-8797",
    label: "Dream Shaper 8797",
  },
  {
    value: "realistic-vision-v13",
    label: "Realistic Vision V13",
  },
  {
    value: "anything-v5",
    label: "Anything V5",
  },
  {
    value: "anything-v3",
    label: "Anything V3",
  },
  {
    value: "anything-v4",
    label: "Anything V4",
  },
  {
    value: "realistic-vision-v40",
    label: "Realistic Vision",
  },
  {
    value: "samaritan-3d-cartoon",
    label: "Samaritan 3D Cartoon",
  },
  {
    value: "real-cartoon-realist",
    label: "Real Cartoon Realist",
  },
  {
    value: "food-crit",
    label: "Food Crit",
  },
  {
    value: "lowpoly-diffusion",
    label: "Lowpoly Diffusion",
  },
  {
    value: "pixel-sprite",
    label: "Pixel Sprite",
  },
  {
    value: "mix-appfactory",
    label: "Mix Appfactory",
  },
  {
    value: "inkmix",
    label: "Inkmix",
  },
  {
    value: "vector-art",
    label: "Vector Art",
  },
  {
    value: "synthwave-diffusion",
    label: "Synthwave Diffusion",
  },
  {
    value: "midjourney-papercut",
    label: "Midjourney Papercut",
  },
  {
    value: "icons-diffusion",
    label: "Icons Diffusion",
  },
  {
    value: "disney-pixar-cartoon",
    label: "Disney Pixar Cartoon",
  },
  {
    value: "woolitize-diffusion",
    label: "Woolitize Diffusion",
  },
];

export function getModelByValue(value: string) {
  return models.find((model) => model.value === value)!;
}

export const samplers = [
  { value: "DDPMScheduler", label: "DDPMScheduler" },
  {
    value: "Euler a",
    label: "Euler a",
  },
  {
    value: "Euler",
    label: "Euler",
  },
  {
    value: "DPM++ 2M",
    label: "DPM++ 2M",
  },
  {
    value: "DPM++ 2M Karras",
    label: "DPM++ 2M Karras",
  },
  {
    value: "DPM++ 2M SDE",
    label: "DPM++ 2M SDE",
  },
  {
    value: "DPM++ 2M SDE Karras",
    label: "DPM++ 2M SDE Karras",
  },
  {
    value: "DPM++ SDE",
    label: "DPM++ SDE",
  },
  {
    value: "DPM++ SDE Karras",
    label: "DPM++ SDE Karras",
  },
  {
    value: "DPM2",
    label: "DPM2",
  },
  {
    value: "DPM2 Karras",
    label: "DPM2 Karras",
  },
  {
    value: "DPM2 a",
    label: "DPM2 a",
  },
  {
    value: "DPM2 a Karras",
    label: "DPM2 a Karras",
  },
  {
    value: "Heun",
    label: "Heun",
  },
  {
    value: "LMS",
    label: "LMS",
  },
  {
    value: "LMS Karras",
    label: "LMS Karras",
  },
];
export const defaultModel = styles[0].value;
export const defaultSampler = samplers[0].value;
