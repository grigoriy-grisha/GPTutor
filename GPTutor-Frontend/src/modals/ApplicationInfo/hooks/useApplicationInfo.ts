import bridge from "@vkontakte/vk-bridge";
import { communicationService } from "$/services/CommunicationService";
import { appService } from "$/services/AppService";

export function useApplicationInfo() {
  const subscribe = () => {
    communicationService.addToSubscribe();
  };

  const favourites = () => {
    communicationService.addToFavorite();
  };

  const share = () => {
    bridge.send("VKWebAppShare").then((data) => {
      console.log(data);
    });
  };

  const getAppLink = () => {
    return !appService.isGPTutor()
      ? "https://vk.com/app51602327"
      : "https://vk.com/app51692825";
  };

  return { subscribe, favourites, share, getAppLink };
}
