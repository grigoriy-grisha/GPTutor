import bridge from "@vkontakte/vk-bridge";
import { communicationService } from "$/services/CommunicationService";

export function useApplicationInfo() {
  const subscribe = () => {
    communicationService.addToSubscribe();
  };

  const favourites = () => {
    communicationService.addToFavorite();
  };

  const share = () => {
    bridge
      .send("VKWebAppShare", {
        link: "https://vk.com/app51602327_206526970",
      })
      .then((data) => {
        console.log(data);
      });
  };

  return { subscribe, favourites, share };
}
