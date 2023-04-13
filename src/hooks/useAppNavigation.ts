import bridge from "@vkontakte/vk-bridge";
import { useEffect } from "react";
import { useReactiveState, useReactiveMemo } from "dignals-react";

export function useAppNavigation(initPanel: string) {
  const activePanel = useReactiveState(initPanel);
  const history = useReactiveState([initPanel]);
  const isFirst = useReactiveMemo(() => history.get().length === 1);

  useEffect(() => {
    bridge.send("VKWebAppSetSwipeSettings", { history: isFirst.get() });
  })

  useEffect(() => {
    window.location.hash = "";
    const onPopState = () => {
      const nextPanel = window.location.hash.slice(1) || initPanel;
      const prevPanel = history.get()[history.get().length - 2];
      const newHistory = [...history.get()];
      if (prevPanel === nextPanel) {
        newHistory.pop();
      } else {
        newHistory.push(nextPanel);
      }
      history.set(newHistory);
      activePanel.set(nextPanel);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);


  return {
    activePanel,
    history,
    goToPage(name: string) {
      window.location.hash = `#${name}`;
    },
    goBack() {
      if (isFirst.get()) {
        bridge.send("VKWebAppClose", { status: "success" });
        return;
      }
      window.history.back();
    }
  }
}