import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { useRouter } from "@happysanta/router";

import { RoutingPages } from "$/entity/routing";

export type NavigationContextType = {
  goBack: () => void;
  goToChapters: () => void;
  goToChat: () => void;
  goToOpenSource: () => void;
  goToChatSettings: () => void;
  goToHistory: () => void;
  goToModes: () => void;
};

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);
export function NavigationContextProvider({
  children,
}: PropsWithChildren<any>) {
  const router = useRouter();

  useEffect(() => router.pushPage(RoutingPages.home), []);

  const goBack = () => router.popPage();
  const goToChapters = () => router.pushPage(RoutingPages.chapters);
  const goToChat = () => router.pushPage(RoutingPages.chat);
  const goToOpenSource = () => router.pushPage(RoutingPages.openSource);
  const goToChatSettings = () => router.pushPage(RoutingPages.chatSettings);
  const goToHistory = () => router.pushPage(RoutingPages.history);
  const goToModes = () => router.pushPage(RoutingPages.modes);

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
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  return useContext(NavigationContext);
}
