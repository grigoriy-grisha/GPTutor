export interface EventSourceMessage {
  id: string;
  event: string;
  data: string;
}

export async function getBytes(
  stream: ReadableStream<Uint8Array>,
  onChunk: (arr: Uint8Array) => void
) {
  const reader = stream.getReader();
  let result: ReadableStreamReadResult<Uint8Array>;
  while (!(result = await reader.read()).done) {
    onChunk(result.value);
  }
}

const enum ControlChars {
  NewLine = 10,
  CarriageReturn = 13,
  Space = 32,
  Colon = 58,
}

export function getLines(
  onLine: (line: Uint8Array, fieldLength: number) => void
) {
  let buffer: Uint8Array | undefined;
  let position: number;
  let fieldLength: number;
  let discardTrailingNewline = false;

  return function onChunk(arr: Uint8Array) {
    if (buffer === undefined) {
      buffer = arr;
      position = 0;
      fieldLength = -1;
    } else {
      buffer = concat(buffer, arr);
    }

    const bufLength = buffer.length;
    let lineStart = 0;
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === ControlChars.NewLine) {
          lineStart = ++position;
        }

        discardTrailingNewline = false;
      }

      let lineEnd = -1;
      for (; position < bufLength && lineEnd === -1; ++position) {
        if (buffer[position] === ControlChars.Colon) {
          if (fieldLength === -1) {
            fieldLength = position - lineStart;
          }
        } else if (buffer[position] === ControlChars.CarriageReturn) {
          discardTrailingNewline = true;
          lineEnd = position;
        } else if (buffer[position] === ControlChars.NewLine) {
          lineEnd = position;
        }
      }

      if (lineEnd === -1) {
        break;
      }

      onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
      lineStart = position;
      fieldLength = -1;
    }

    if (lineStart === bufLength) {
      buffer = undefined;
    } else if (lineStart !== 0) {
      buffer = buffer.subarray(lineStart);
      position -= lineStart;
    }
  };
}

export function getMessages(
  onId: (id: string) => void,
  onMessage?: (msg: EventSourceMessage) => void
) {
  let message = newMessage();
  const decoder = new TextDecoder();

  return function onLine(line: Uint8Array, fieldLength: number) {
    if (line.length === 0) {
      onMessage?.(message);
      message = newMessage();
    } else if (fieldLength > 0) {
      const field = decoder.decode(line.subarray(0, fieldLength));
      const valueOffset =
        fieldLength + (line[fieldLength + 1] === ControlChars.Space ? 2 : 1);
      const value = decoder.decode(line.subarray(valueOffset));

      if (field === "data") {
        message.data = message.data ? message.data + "\n" + value : value; // otherwise,
      } else if (field === "event") {
        message.event = value;
      } else if (field === "id") {
        onId((message.id = value));
      }
    }
  };
}

function concat(a: Uint8Array, b: Uint8Array) {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}

function newMessage(): EventSourceMessage {
  return {
    data: "",
    event: "",
    id: "",
  };
}
