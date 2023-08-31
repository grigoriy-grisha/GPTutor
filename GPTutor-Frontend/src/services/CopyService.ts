import bridge from "@vkontakte/vk-bridge";

import ReactivePromise from "./ReactivePromise";

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand("copy");

  document.body.removeChild(textArea);
}

export function copyToClickBoard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text);
}

export class CopyService {
  copyToClickBoard$ = ReactivePromise.create((text: string) =>
    this.onCopy(text)
  );

  onCopy(text: string) {
    if (process.env.NODE_ENV === "development") {
      return new Promise((resolve) => {
        copyToClickBoard(text);
        resolve(undefined);
      });
    }

    return bridge.send("VKWebAppCopyText", { text });
  }
}

export const copyService = new CopyService();
