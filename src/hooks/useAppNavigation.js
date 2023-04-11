import bridge from "@vkontakte/vk-bridge";
import { useEffect, useRef, useState } from "react";

export function useAppNavigation(initPanel) {
  const [activePanel, setActivePanel] = useState(initPanel);
  const historyRef = useRef([initPanel]);
  const isFirst = historyRef.current.length === 1;

  function goToPage(name) {
    window.location.hash = `#${name}`;
  }

  function goBack() {
    if (historyRef.current.length === 1) {
      bridge.send("VKWebAppClose", { status: "success" });

      return;
    }

    window.history.back();
  }

  useEffect(() => {
    bridge.send("VKWebAppSetSwipeSettings", { history: isFirst });
  }, [isFirst]);

  useEffect(() => {
    window.location.hash = "";

    const onPopState = () => {
      const nextPanel = window.location.hash.slice(1) || initPanel;
      const prevPanel = historyRef.current[historyRef.current.length - 2];

      if (prevPanel === nextPanel) {
        historyRef.current.pop();
      } else {
        historyRef.current.push(nextPanel);
      }

      setActivePanel(nextPanel);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return { activePanel, goToPage, goBack, history: historyRef.current };
}
