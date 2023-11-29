import { Subscription } from "$/entity/subscriptions/types";
import { ErrorResponseType } from "$/entity/common";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

type Response = ErrorResponseType | boolean;
export async function getImageAgreement(): Promise<Response> {
  const response = await fetch(`${BACKEND_HOST}user/image-agreement`, {
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
  return response.json();
}

export async function setImageAgreement(): Promise<Response> {
  const response = await fetch(`${BACKEND_HOST}user/image-agreement`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
  return response.json();
}
