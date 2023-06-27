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

    console.log(url);
    bridge
      .send("VKWebAppDownloadFile", {
        url,
        filename: `${filename}.txt`,
      })
      .then((s) => {
        console.log(s);
      })
      .catch((s) => {
        console.log(s);
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

    console.log(url);
    bridge
      .send("VKWebAppDownloadFile", {
        url,
        filename: `${filename}.json`,
      })
      .then((s) => {
        console.log(s);
      })
      .catch((s) => {
        console.log(s);
      });
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}

export const downloadService = new DownloadService();
