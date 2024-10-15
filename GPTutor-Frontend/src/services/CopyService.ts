import bridge from "@vkontakte/vk-bridge";

import ReactivePromise from "./ReactivePromise";
import { appService } from "$/services/AppService";

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
  copyToClickBoard$ = ReactivePromise.create(this.onCopy);

  onCopy(text: string) {
    if (appService.isTG()) {
      fallbackCopyTextToClipboard(text);
      return Promise.resolve({ result: true });
    }
    return bridge.send("VKWebAppCopyText", { text });
  }
}

export const copyService = new CopyService();
