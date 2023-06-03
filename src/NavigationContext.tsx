import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { useLocation, useRouter } from "@happysanta/router";

import { RoutingPages, Views } from "$/entity/routing";

export type NavigationContextType = {
  goBack: () => void;
  goToChapters: () => void;
  goToChat: () => void;
  goToOpenSource: () => void;
  goToChatSettings: () => void;
  goToHistory: () => void;
  goToModes: () => void;
  goToForbidden: () => void;
};

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);
export function NavigationContextProvider({
  children,
}: PropsWithChildren<any>) {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => router.pushPage(RoutingPages.home), []);

  const activePanel = location.getViewActivePanel(Views.viewMain)!;

  function push(panel: RoutingPages) {
    if (panel.slice(1) === activePanel) return;
    router.pushPage(panel);
  }

  const goBack = () => router.popPage();
  const goToChapters = () => push(RoutingPages.chapters);
  const goToChat = () => push(RoutingPages.chat);
  const goToOpenSource = () => push(RoutingPages.openSource);
  const goToChatSettings = () => push(RoutingPages.chatSettings);
  const goToHistory = () => push(RoutingPages.history);
  const goToModes = () => push(RoutingPages.modes);

  const goToForbidden = () => push(RoutingPages.forbidden);

  return (
    <NavigationContext.Provider
      value={{
        goBack,
        goToHistory,
        goToChapters,
        goToChat,
        goToChatSettings,
        goToModes,
        goToOpenSource,
        goToForbidden,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  return useContext(NavigationContext);
}
