import bridge from "@vkontakte/vk-bridge";
import { Platform } from "@vkontakte/vkui";

class DownloadService {
  constructor() {
    bridge.subscribe(eventHandler);

    // Обработчик событий
    function eventHandler(e: any) {
      console.log(e);
    }
  }

  download(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    this.downloadLink(url, filename);
  }

  downloadLink(url: string, filename?: string) {
    this.toDataURL(url).then((dataUrl: string) => {
      const element = document.createElement("a");
      element.href = dataUrl;
      element.download = filename || url.substring(url.lastIndexOf("/") + 1);
      element.target = "_blank";
      element.click();
      element.remove();
    });
  }

  downloadBase64(dataUrl: string, filename: string) {
    const element = document.createElement("a");
    element.href = dataUrl;
    element.download = filename;
    element.target = "_blank";
    element.click();
    element.remove();
  }

  toDataURL = (url: string) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob): Promise<string> =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  appDownloadLink(platform: string, url: string, filename?: string) {
    if (platform === Platform.VKCOM) {
      this.downloadLink(url, filename);
      return;
    }

    bridge.send("VKWebAppDownloadFile", {
      url: url,
      filename: filename || url.substring(url.lastIndexOf("/") + 1),
    });
  }

  async downloadByLink(link: string, filename: string) {
    this.downloadLink(link, filename);
  }

  async downloadAndConvertToBase64(
    url: string
  ): Promise<string | ArrayBuffer | null> {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);

      reader.readAsDataURL(blob);
    });
  }
}

export const downloadService = new DownloadService();
