import { CreateMessageParams, RemoteMessage } from "$/entity/messages";

const BACKEND_HOST = _env_.REACT_APP_BACKEND_HOST;

export function createMessage(params: CreateMessageParams) {
  return fetch(`${BACKEND_HOST}messages`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export function getMessagesById(historyId: string): Promise<RemoteMessage[]> {
  return fetch(`${BACKEND_HOST}messages/` + historyId, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function downloadMessagesUrl(type: string, historyId: string) {
  return `${BACKEND_HOST}messages/${type}/${historyId}?vk_access_token_settings=menu&vk_app_id=51602327&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_is_favorite=1&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1687965397&vk_user_id=548334196&sign=etfd0Hbqu9v3Dq_ab-9lcyiNDJVuge4ppGYQ7M_BnjM`;
}
