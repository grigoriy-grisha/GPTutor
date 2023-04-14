import bridge from "@vkontakte/vk-bridge";

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

class CopyService {
  onCopy(text: string, onSuccess?: () => void, onError?: () => void) {
    if (process.env.NODE_ENV === "development") {
      new Promise((resolve) => {
        copyToClickBoard(text);
        resolve(undefined);
      })
        .then(onSuccess)
        .catch(onError);

      return;
    }
    bridge.send("VKWebAppCopyText", { text }).then(onSuccess).catch(onError);
  }
}

export const copyService = new CopyService();
