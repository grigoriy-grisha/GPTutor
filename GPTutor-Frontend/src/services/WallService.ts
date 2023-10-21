import bridge from "@vkontakte/vk-bridge";
import { authService } from "$/services/AuthService";
import { uploadPhoto } from "$/api/vk";

class WallService {
  async createPost(imageUrl: string) {
    const resultWallUploadServer = await wallService.getWallUploadServer();

    const result = await uploadPhoto(
      resultWallUploadServer.response.upload_url,
      imageUrl
    );

    const resultSavePhoto = await wallService.saveWallPhoto(
      result.photo,
      result.server,
      result.hash
    );

    const [photoData] = resultSavePhoto.response;

    wallService.post(photoData.owner_id, photoData.id);
  }

  getWallUploadServer() {
    return bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.getWallUploadServer",
      params: {
        v: "5.131",
        access_token: authService.token,
      },
    }) as Promise<{ response: { upload_url: string } }>;
  }

  saveWallPhoto(photo: string, server: number, hash: string) {
    return bridge.send("VKWebAppCallAPIMethod", {
      method: "photos.saveWallPhoto",
      params: {
        photo,
        server,
        hash,
        v: "5.131",
        access_token: authService.token,
      },
    }) as Promise<{ response: [{ id: number; owner_id: number }] }>;
  }

  post(owner_id: number, photo_id: number) {
    bridge
      .send("VKWebAppShowWallPostBox", {
        message:
          "Генерирую нейрокартинки в Stable Art! https://vk.com/app51602327",
        attachments: `photo${owner_id}_${photo_id}`,
      })
      .then((data) => {
        console.log(data);
      });
  }
}

export const wallService = new WallService();
