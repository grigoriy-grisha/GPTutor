const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export function badListCheck(text: string): Promise<boolean> {
  return fetch(`${BACKEND_HOST}bad-list/check`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then((res) => res.json());
}
