import { EventSourceMessage, getBytes, getLines, getMessages } from "./parse";

export const EventStreamContentType = "text/event-stream;charset=UTF-8";

const LastEventId = "last-event-id";

export interface FetchEventSourceInit extends RequestInit {
  headers?: Record<string, string>;
  onopen?: (response: Response) => Promise<void>;
  onmessage?: (ev: EventSourceMessage) => void;
  onclose?: () => void;
  onerror?: (err: any) => number | null | undefined | void;
}

function isContentTypeJson(response: Response) {
  return !!response.headers.get("Content-type")?.startsWith("application/json");
}

export function fetchEventSource(
  input: RequestInfo,
  {
    headers: inputHeaders,
    onopen: inputOnOpen,
    onmessage,
    onclose,
    onerror,
    ...rest
  }: FetchEventSourceInit
) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<void>(async (resolve, reject) => {
    const headers = { ...inputHeaders };
    if (!headers.accept) headers.accept = EventStreamContentType;

    const onopen = inputOnOpen || defaultOnOpen;

    try {
      const response = await fetch(input, { ...rest, headers });

      if (isContentTypeJson(response)) {
        await response.json().then(resolve);
      }

      await onopen(response);

      await getBytes(
        response.body!,
        getLines(
          getMessages((id) => {
            if (id) return (headers[LastEventId] = id);
            delete headers[LastEventId];
          }, onmessage)
        )
      );

      onclose?.();

      resolve();
    } catch (err: any) {
      if (err?.name === "AbortError") {
        resolve();
        return;
      }

      onerror?.(err);
      reject(err);
    }
  });
}

function defaultOnOpen(response: Response) {
  const contentType = response.headers.get("content-type");
  if (!contentType?.startsWith(EventStreamContentType)) {
    throw new Error(
      `Expected content-type to be ${EventStreamContentType}, Actual: ${contentType}`
    );
  }
}
