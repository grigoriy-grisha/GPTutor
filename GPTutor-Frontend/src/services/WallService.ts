import bridge from "@vkontakte/vk-bridge";
import { authService } from "$/services/AuthService";
import { uploadPhoto, uploadPhotoUrl, wallPostGroup } from "$/api/vk";
import { downloadService } from "$/services/DownloadService";

class WallService {
  async createPost(imageId: string) {
    const resultWallUploadServer = await wallService.getWallUploadServer();

    const result = await uploadPhoto(
      resultWallUploadServer.response.upload_url,
      imageId
    );

    const resultSavePhoto = await wallService.saveWallPhoto(
      result.photo,
      result.server,
      result.hash
    );

    const [photoData] = resultSavePhoto.response;

    wallService.post(
      "Генерирую нейрокартинки в Stable Art! https://vk.com/app51692825",
      photoData.owner_id,
      photoData.id
    );
  }

  async createPostGroup(imageUrl: string) {
    const resultWallUploadServer = await wallService.getWallUploadServer();

    const result = await uploadPhotoUrl(
      resultWallUploadServer.response.upload_url,
      imageUrl
    );

    const resultSavePhoto = await wallService.saveWallPhoto(
      result.photo,
      result.server,
      result.hash
    );

    const [photoData] = resultSavePhoto.response;

    const hello = await wallService.postWallApi(
      "asdasd",
      photoData.owner_id,
      photoData.id,
      -225849408
    );

    console.log(hello);
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

  post(message: string, owner_id: number, photo_id: number, groupId?: number) {
    bridge
      .send("VKWebAppShowWallPostBox", {
        ...(groupId ? { owner_id: groupId } : {}),
        message,
        attachments: `photo${owner_id}_${photo_id}`,
      })
      .then((data) => {
        console.log(data);
      });
  }

  postWallApi(
    message: string,
    owner_id: number,
    photo_id: number,
    groupId: number
  ) {
    return wallPostGroup({
      attachments: `photo${owner_id}_${photo_id}`,
      message,
      ownerId: owner_id,
      groupId,
    });
  }
}

export const wallService = new WallService();
