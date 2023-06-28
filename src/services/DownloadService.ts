import bridge from "@vkontakte/vk-bridge";

class DownloadService {
  download(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    this.downloadLink(url, filename);
  }

  downloadLink(url: string, filename: string) {
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
    if (process.env.NODE_ENV === "development") {
      this.downloadLink(link, filename);
      return;
    }

    console.log(link);

    await bridge
      .send("VKWebAppDownloadFile", {
        url: link,
        filename: filename,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }
}

export const downloadService = new DownloadService();
