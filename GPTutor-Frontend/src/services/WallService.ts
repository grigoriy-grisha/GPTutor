import bridge from "@vkontakte/vk-bridge";
import { authService } from "$/services/AuthService";
import { uploadPhoto } from "$/api/vk";
import { downloadService } from "$/services/DownloadService";

class WallService {
  async createPost(image: HTMLImageElement) {
    const resultWallUploadServer = await wallService.getWallUploadServer();

    const base64Image = downloadService.getBase64ByImage(image);
    console.log(base64Image);

    if (!base64Image) return;

    const result = await uploadPhoto(
      resultWallUploadServer.response.upload_url,
      String(base64Image)
    );

    const resultSavePhoto = await wallService.saveWallPhoto(
      result.photo,
      result.server,
      result.hash
    );

    const [photoData] = resultSavePhoto.response;

    wallService.post(photoData.owner_id, photoData.id);
  }

  async getWallUploadServer(): Promise<{ response: { upload_url: string } }> {
    await authService.setupToken("photos");
    return await bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.getWallUploadServer",
      params: {
        v: "5.131",
        access_token: authService.token,
      },
    });
  }

  async saveWallPhoto(
    photo: string,
    server: number,
    hash: string
  ): Promise<{ response: [{ id: number; owner_id: number }] }> {
    // await authService.setupToken("wall");
    return await bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.saveWallPhoto",
      params: {
        photo,
        server,
        hash,
        v: "5.131",
        access_token: authService.token,
      },
    });
  }

  post(owner_id: number, photo_id: number) {
    bridge
      .send("VKWebAppShowWallPostBox", {
        message:
          "Генерирую нейрокартинки в Stable Art! https://vk.com/app51692825",
        attachments: `photo${owner_id}_${photo_id}`,
      })
      .then((data) => {
        console.log(data);
      });
  }
}

export const wallService = new WallService();
