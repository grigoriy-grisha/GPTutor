import { cancelFullScreen, fullScreen } from "$/utility/fullScreen";
import { sig } from "dignals";

const isFullScreen = sig(false);

addEventListener("fullscreenchange", (event) => {
  isFullScreen.set(!isFullScreen.get());
});

export function useFullScreen() {
  return {
    isFullScreen: isFullScreen.get(),
    onFullScreen: () => {
      fullScreen();
    },
    offFullScreen: () => {
      cancelFullScreen();
    },
  };
}
