import bridge from "@vkontakte/vk-bridge";
import { snackbarNotify } from "$/entity/notify";

export function useApplicationInfo() {
  const subscribe = () => {
    bridge
      .send("VKWebAppJoinGroup", { group_id: 220371433 })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        snackbarNotify.notify({
          type: "error",
          message: "Произошла ошибка, не удалось подписаться на группу",
        });
        console.log(error);
      });
  };

  const favourites = () => {
    bridge
      .send("VKWebAppAddToFavorites")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        snackbarNotify.notify({
          type: "error",
          message: "Произошла ошибка, не удалось добавить в избранное",
        });
        console.log(error);
      });
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
