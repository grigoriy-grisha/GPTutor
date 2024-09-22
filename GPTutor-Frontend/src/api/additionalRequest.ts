import {
  AdditionalRequest,
  AdditionalRequestCreate,
} from "$/entity/additionalRequest/types";
import { httpService } from "$/services/HttpService";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function createAdditionalRequest(
  params: AdditionalRequestCreate
): Promise<AdditionalRequest> {
  return httpService
    .post("additional-request", params)
    .then((res) => res.json());
}

export function getAdditionalRequest(): Promise<AdditionalRequest[]> {
  return httpService.get("additional-request").then((res) => res.json());
}

export function deleteAdditionalRequestById(id: string) {
  return httpService.delete("additional-request");
}

export function updateAdditionalRequestById(params: AdditionalRequest) {
  return httpService
    .put("additional-request", params)
    .then((res) => res.json());
}
