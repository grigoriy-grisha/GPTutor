const API_KEY = "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";

export async function sendCompletions(body: any, controller: AbortController) {
  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  }).then((data) => data.json());
}
