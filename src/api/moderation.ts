import { GPTModeration } from "$/entity/GPT";

export function moderationText(input: string): Promise<GPTModeration> {
  return fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      Authorization: "Bearer ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, model: "text-moderation-latest" }),
  }).then((res) => res.json());
}
