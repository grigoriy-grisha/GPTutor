import { HistoryCreate } from "$/entity/history/types";
import { History } from "$/entity/history";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || "/api/";

export function createHistory(params: HistoryCreate): Promise<History> {
  return fetch(`${BACKEND_HOST}history`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
}

export function getHistoryById(id: string): Promise<History[]> {
  return fetch(`${BACKEND_HOST}history/` + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function deleteHistory(id: string) {
  return fetch(`${BACKEND_HOST}history/` + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
}
