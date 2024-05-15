import {
  CreateHumorRequest,
  HumorEntityLikes,
  HumorItem,
} from "$/entity/humor";
import { Pageable } from "$/entity/common";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function createHumor(params: CreateHumorRequest): Promise<HumorItem> {
  return fetch(`${BACKEND_HOST}humor`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function getHumors(pageNumber: number): Promise<Pageable<HumorItem>> {
  return fetch(`${BACKEND_HOST}humor?pageNumber=${pageNumber}&types=anecdote`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function addLike(humorId: string): Promise<HumorEntityLikes> {
  return fetch(`${BACKEND_HOST}humor/${humorId}/like`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function removeLike(likeId: string): Promise<boolean> {
  return fetch(`${BACKEND_HOST}humor/like/${likeId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
