import bridge from "@vkontakte/vk-bridge";

class DownloadService {
  download(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadTxt(text: string, filename: string) {
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, text]);

    if (process.env.NODE_ENV === "development") {
      this.download(blob, filename);
      return;
    }

    const url = window.URL.createObjectURL(blob);

    bridge.send("VKWebAppDownloadFile", {
      url,
      filename: `${filename}.txt`,
    });
  }

  downloadJSON(json: Record<any, any>, filename: string) {
    const str = JSON.stringify(json, null, 4);
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, str]);

    if (process.env.NODE_ENV === "development") {
      this.download(blob, `${filename}.json`);
      return;
    }

    const url = window.URL.createObjectURL(blob);

    bridge.send("VKWebAppDownloadFile", {
      url: url,
      filename: `${filename}.json`,
    });
  }

  private encode(s: string) {
    const out = [];
    for (let i = 0; i < s.length; i++) {
      out[i] = s.charCodeAt(i);
    }
    return new Uint8Array(out);
  }
}

export const downloadService = new DownloadService();
