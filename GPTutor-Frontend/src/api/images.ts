import {
  GeneratedImage,
  GenerateImageRequest,
} from "$/entity/imageGeneration/types";
import { ErrorResponseType } from "$/entity/common";

const BACKEND_HOST = _env_.REACT_APP_BACKEND_HOST;

export function generateImage(
  params: GenerateImageRequest
): Promise<GeneratedImage & ErrorResponseType> {
  return fetch(`${BACKEND_HOST}image`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}
