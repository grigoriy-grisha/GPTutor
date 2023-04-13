import { fetchEventSource } from "@microsoft/fetch-event-source";

const API_KEY = "";

export async function sendChatCompletions(
  body: any,
  onMessage: (content: string, isFirst: boolean) => void,
  onError: () => void,
  controller: AbortController
) {
  let isFirst = true;
  let isHasError = false;

  await fetchEventSource("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, stream: true }),
    signal: controller.signal,
    onmessage(event) {
      const eventData = JSON.parse(event.data);
      const delta = eventData.choices[0].delta;

      if (!Object.keys(delta).length) return controller.abort();

      if (!delta.content) return;
      onMessage(delta.content, isFirst);
      isFirst = false;
    },
    onerror() {
      if (!isHasError) {
        onError();
        isHasError = true;
      }
    },
  });
}
