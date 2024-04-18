import {
  AdditionalRequest,
  AdditionalRequestCreate,
} from "$/entity/additionalRequest/types";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function createAdditionalRequest(
  params: AdditionalRequestCreate
): Promise<AdditionalRequest> {
  return fetch(`${BACKEND_HOST}additional-request`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function getAdditionalRequest(): Promise<AdditionalRequest[]> {
  return fetch(`${BACKEND_HOST}additional-request`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function deleteAdditionalRequestById(id: string) {
  return fetch(`${BACKEND_HOST}additional-request/` + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
}

export function updateAdditionalRequestById(params: AdditionalRequest) {
  return fetch(`${BACKEND_HOST}additional-request`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}
