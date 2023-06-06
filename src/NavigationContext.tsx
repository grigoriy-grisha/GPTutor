import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useRouter } from "@happysanta/router";

import { Modals, Panels, RoutingPages, Views } from "$/entity/routing";

export type NavigationContextType = {
  goBack: () => void;
  goToChapters: () => void;
  goToChatFree: () => void;
  goToChatLesson: () => void;
  goToOpenSource: () => void;

  goToHistory: () => void;
  goToModes: () => void;
  goToForbidden: () => void;
  openChatSettingsModal: () => void;
  openApplicationInfo: () => void;
  isForbidden: boolean;
};

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);

export function NavigationContextProvider({
  children,
}: PropsWithChildren<any>) {
  const [isForbidden, setForbidden] = useState(false);

  const location = useLocation();
  const router = useRouter();

  useEffect(() => router.pushPage(RoutingPages.home), []);

  const activePanel = location.getViewActivePanel(Views.viewMain)!;

  function push(panel: RoutingPages) {
    if (panel.slice(1) === activePanel) return;
    router.pushPage(panel);
  }

  const goBack = () => {
    if (activePanel === Panels.forbidden) return;

    router.popPage();
  };

  useEffect(() => {
    if (activePanel === Panels.forbidden) setForbidden(true);
  }, [activePanel]);

  const goToChapters = () => push(RoutingPages.chapters);
  const goToChatFree = () => push(RoutingPages.chatFree);
  const goToChatLesson = () => push(RoutingPages.chatLesson);
  const goToOpenSource = () => push(RoutingPages.openSource);
  const goToHistory = () => push(RoutingPages.history);
  const goToModes = () => push(RoutingPages.modes);

  const goToForbidden = () => push(RoutingPages.forbidden);

  const openChatSettingsModal = () => router.pushModal(Modals.chatSettings);
  const openApplicationInfo = () => router.pushModal(Modals.applicationInfo);

  return (
    <NavigationContext.Provider
      value={{
        goBack,
        goToHistory,
        goToChapters,
        goToChatFree,
        goToChatLesson,
        goToModes,
        goToOpenSource,
        goToForbidden,
        openChatSettingsModal,
        openApplicationInfo,
        isForbidden,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  return useContext(NavigationContext);
}
