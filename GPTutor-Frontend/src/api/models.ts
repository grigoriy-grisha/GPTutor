import { Model } from "$/entity/models";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function getModels(): Promise<Model[]> {
  return fetch(`${BACKEND_HOST}models/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
