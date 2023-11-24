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

export class CopyService {
  copyToClickBoard$ = ReactivePromise.create((text: string) =>
    this.onCopy(text)
  );

  onCopy(text: string) {
    return bridge.send("VKWebAppCopyText", { text });
  }
}

export const copyService = new CopyService();
