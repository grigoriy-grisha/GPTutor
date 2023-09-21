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

  downloadTxt(text: string, filename: string) {
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, text]);

    this.download(blob, filename);
    return;
  }

  downloadJSON(json: Record<any, any>, filename: string) {
    const str = JSON.stringify(json, null, 4);
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, str]);

    this.download(blob, `${filename}.json`);
    return;
  }

  async downloadByLink(link: string, filename: string) {
    this.downloadLink(link, filename);
  }
}

export const downloadService = new DownloadService();
