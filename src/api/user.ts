import { User } from "$/entity/user/types";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || "/api/";

export function createUser(vkId: number): Promise<User> {
  return fetch(`${BACKEND_HOST}user`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vkId }),
  }).then((res) => res.json());
}
