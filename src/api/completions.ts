import { EventSourceMessage, fetchEventSource } from "$/utility";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || "/api/";

export async function sendChatCompletions(
  apiKey: string,
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
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, stream: true }),
    signal: controller.signal,
    onmessage(event: EventSourceMessage) {
      if (event.data === "[DONE]") return;

      const eventData = JSON.parse(event.data);
      const delta = eventData.choices[0].delta;

      if (!Object.keys(delta).length) return;

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

  return isHasError;
}

export function setCacheCompletions(convention: {
  name: string;
  message: string;
}) {
  return fetch(`${BACKEND_HOST}cache`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(convention),
  }).then((res) => res.json());
}

type CheckChatCompletionsParams = {
  conversationName: string;
  onMessage: (content: string, isFirst: boolean) => void;
  abortController: AbortController;
};

export async function getChatCompletions({
  conversationName,
  onMessage,
  abortController,
}: CheckChatCompletionsParams) {
  let isFirst = true;

  try {
    await fetchEventSource(
      `${BACKEND_HOST}cache?conversationName=${conversationName}`,
      {
        signal: abortController.signal,
        method: "GET",
        onmessage: (event) => {
          onMessage(decodeURIComponent(event.data) + " ", isFirst);
          isFirst = false;
        },
        onerror: (err) => {
          console.log(err);
        },
      }
    );
  } catch {
    return false;
  }

  return true;
}

export function getApiKey() {
  return fetch(`${BACKEND_HOST}api-key`).then((res) => res.text());
}
