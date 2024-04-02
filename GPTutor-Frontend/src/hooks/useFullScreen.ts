import { useEffect, useState } from "react";
import { cancelFullScreen, fullScreen } from "$/utility/fullScreen";

export function useFullScreen() {
  const [isFullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    addEventListener("fullscreenchange", (event) => {
      setFullScreen((prev) => !prev);
    });
  }, []);

  return {
    isFullScreen,
    onFullScreen: () => {
      fullScreen();
    },
    offFullScreen: () => {
      cancelFullScreen();
    },
  };
}
