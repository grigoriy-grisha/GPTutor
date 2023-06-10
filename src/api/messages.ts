import { CreateMessageParams, RemoteMessage } from "$/entity/messages";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || "/api/";

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
