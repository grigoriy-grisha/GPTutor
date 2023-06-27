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

  async downloadTxt(text: string, filename: string) {
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, text]);

    if (process.env.NODE_ENV === "development") {
      this.download(blob, filename);
      return;
    }

    const base64 = await this.blobToBase64(blob);

    console.log(base64);
    bridge
      .send("VKWebAppDownloadFile", {
        url: base64,
        filename: `${filename}.txt`,
      })
      .then((s) => {
        console.log(s);
      })
      .catch((s) => {
        console.log(s);
      });
  }

  async downloadJSON(json: Record<any, any>, filename: string) {
    const str = JSON.stringify(json, null, 4);
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, str]);

    if (process.env.NODE_ENV === "development") {
      this.download(blob, `${filename}.json`);
      return;
    }

    const base64 = await this.blobToBase64(blob);

    console.log(base64);
    bridge
      .send("VKWebAppDownloadFile", {
        url: base64,
        filename: `${filename}.json`,
      })
      .then((s) => {
        console.log(s);
      })
      .catch((s) => {
        console.log(s);
      });
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}

export const downloadService = new DownloadService();
