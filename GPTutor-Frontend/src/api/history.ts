import { HistoryCreate } from "$/entity/history/types";
import { History } from "$/entity/history";
import { Pageable } from "$/entity/common";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function createHistory(params: HistoryCreate): Promise<History> {
  return fetch(`${BACKEND_HOST}history`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function getHistoryById(pageNumber: number): Promise<Pageable<History>> {
  return fetch(`${BACKEND_HOST}history?pageNumber=${pageNumber}`, {
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
  }).then((res) => res.json());
}

export function deleteAllHistory() {
  return fetch(`${BACKEND_HOST}history`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + location.href,
    },
  }).then((res) => res.json());
}
