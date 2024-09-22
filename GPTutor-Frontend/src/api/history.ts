import { HistoryCreate } from "$/entity/history/types";
import { History } from "$/entity/history";
import { Pageable } from "$/entity/common";
import { httpService } from "$/services/HttpService";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function createHistory(params: HistoryCreate): Promise<History> {
  return fetch(`${BACKEND_HOST}history`, {
    method: "POST",
    headers: {
      Authorization: httpService.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function getHistoryById(
  pageNumber: number,
  search: string
): Promise<Pageable<History>> {
  return fetch(
    `${BACKEND_HOST}history?pageNumber=${pageNumber}&search=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: httpService.authorization,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

export function deleteHistory(id: string) {
  return fetch(`${BACKEND_HOST}history/` + id, {
    method: "DELETE",
    headers: {
      Authorization: httpService.authorization,
    },
  }).then((res) => res.json());
}

export function deleteAllHistory() {
  return fetch(`${BACKEND_HOST}history`, {
    method: "DELETE",
    headers: {
      Authorization: httpService.authorization,
    },
  }).then((res) => res.json());
}

export function updateHistory(history: History) {
  return fetch(`${BACKEND_HOST}history`, {
    method: "PUT",
    headers: {
      Authorization: httpService.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(history),
  }).then((res) => res.json());
}
