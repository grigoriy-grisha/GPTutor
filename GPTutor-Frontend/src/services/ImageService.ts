import bridge from "@vkontakte/vk-bridge";

class ImageService {
  openImages(images: string[]) {
    bridge
      .send("VKWebAppShowImages", {
        images: images,
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
}

export const imageService = new ImageService();
