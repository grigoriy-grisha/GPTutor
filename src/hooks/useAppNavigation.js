import bridge from "@vkontakte/vk-bridge";
import { useEffect, useRef, useState } from "react";

export function useAppNavigation(initHistory) {
  const [activePanel, setActivePanel] = useState("home");
  const historyRef = useRef(initHistory);

  function goToPage(name) {
    historyRef.current.push(name);
    window.location.hash = `#${name}`;
  }

  function goBack() {
    if (historyRef.current.length === 1) {
      bridge.send("VKWebAppClose", { status: "success" });
      return;
    }

    historyRef.current.pop();
    window.history.back();
  }

  useEffect(() => {
    window.location.hash = "";

    const onPopState = () => {
      setActivePanel(window.location.hash.slice(1) || "home");
    };

    bridge
      .send("VKWebAppSetSwipeSettings", { history: true })
      .then(() => {})
      .catch((error) => console.log(error));

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return { activePanel, goToPage, goBack };
}
