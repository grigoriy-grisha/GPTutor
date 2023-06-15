import { EventSourceMessage, fetchEventSource } from "$/utility";
import { snackbarNotify } from "$/entity/notify";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

export async function sendChatCompletions(
  body: any,
  onMessage: (content: string, isFirst: boolean) => void,
  onError: () => void,
  controller: AbortController
) {
  let isFirst = true;
  let isHasError = false;

  const timeOut = setInterval(() => {
    snackbarNotify.notify({
      type: "success",
      message: "Терпение! Вы находитесь в очереди на ответ.",
      delay: 3500,
    });
  }, 10000);

  await fetchEventSource(`${BACKEND_HOST}conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + location.href,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
    onmessage(event: EventSourceMessage) {
      clearInterval(timeOut);

      if (event.data === "[DONE]")  return;
      if (event.data.startsWith("[Error]")) {
        throw new Error(event.data);
      }

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
