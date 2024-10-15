import { ErrorResponseType } from "$/entity/common";
import { httpService } from "$/services/HttpService";

type Response = ErrorResponseType | boolean;

export async function getImageAgreement(): Promise<Response> {
  return httpService.get("user/image-agreement").then((res) => res.json());
}

export async function setImageAgreement(): Promise<Response> {
  return httpService.post("user/image-agreement", {}).then((res) => res.json());
}

export async function getBalance(): Promise<{
  id: string;
  tokens_gpt: number;
}> {
  return httpService.get("user/balance").then((res) => res.json());
}
