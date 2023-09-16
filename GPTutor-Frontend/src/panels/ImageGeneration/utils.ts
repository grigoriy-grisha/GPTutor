import { ImageAspectRatio } from "$/entity/imageGeneration/types";

export function getImageSize(aspectRatio: ImageAspectRatio) {
  if (aspectRatio === ImageAspectRatio.portrait) return "512x768";
  if (aspectRatio === ImageAspectRatio.landscape) return "768x512";
  return "512x512";
}
