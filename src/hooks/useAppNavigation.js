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
    const onPopState = () => {
      setActivePanel(window.location.hash.slice(1) || "home");
    };

    bridge.send("VKWebAppEnableSwipeBack", {});
    window.addEventListener("popstate", onPopState);
    return () => {
      bridge.send("VKWebAppDisableSwipeBack", {});
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return { activePanel, goToPage, goBack };
}
