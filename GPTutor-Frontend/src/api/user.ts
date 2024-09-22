import { ErrorResponseType } from "$/entity/common";
import { httpService } from "$/services/HttpService";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

type Response = ErrorResponseType | boolean;
export async function getImageAgreement(): Promise<Response> {
  const response = await fetch(`${BACKEND_HOST}user/image-agreement`, {
    headers: {
      Authorization: httpService.authorization,
    },
  });
  return response.json();
}

export async function setImageAgreement(): Promise<Response> {
  const response = await fetch(`${BACKEND_HOST}user/image-agreement`, {
    method: "POST",
    headers: {
      Authorization: httpService.authorization,
    },
  });
  return response.json();
}
