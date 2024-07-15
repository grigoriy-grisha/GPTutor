import { EventSourceMessage, fetchEventSource } from "$/utility";
import { VkDocsResponse } from "$/entity/GPT";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export async function sendChatCompletions(
  body: any,
  onMessage: (content: string, isFirst: boolean, isSecond: boolean) => void,
  onError: () => void,
  controller: AbortController
) {
  let isFirst = true;
  let isSecond = true;
  let isHasError = false;

  await fetchEventSource(`${BACKEND_HOST}conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + location.href,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
    onmessage(event: EventSourceMessage) {
      if (event.data === "[DONE]") return;
      if (event.data.startsWith("[Error]")) {
        throw new Error(event.data);
      }

      const eventData = JSON.parse(event.data);
      const delta = eventData.choices[0].delta;

      if (!Object.keys(delta).length) return;

      if (!delta.content) return;
      onMessage(delta.content, isFirst, isSecond);

      if (!isFirst) {
        isSecond = false;
      }
      isFirst = false;
    },
    onerror(err) {
      if (!isHasError) {
        onError();
        isHasError = true;
      }
    },
  });

  return isHasError;
}

export function conversationVKDoc(question: string): Promise<VkDocsResponse> {
  return fetch(`${BACKEND_HOST}vk-doc/conversation`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + location.href,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  }).then((res) => res.json());
}
