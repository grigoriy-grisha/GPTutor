import { History, HistoryCreate } from "$/entity/history";
import { CreateHumorRequest } from "$/entity/humor";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function createHumor(params: CreateHumorRequest): Promise<History> {
  return fetch(`${BACKEND_HOST}humor`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}
