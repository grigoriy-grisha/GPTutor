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
  goToChatInterview: () => void;
  goToOpenSource: () => void;
  goToHistory: () => void;
  goToModes: () => void;
  goToForbidden: () => void;
  openChatSettingsModal: () => void;
  openApplicationInfo: () => void;
  openInterviewQuestions: () => void;
  goToLeetcodeProblems: () => void;
  goToChatLeetCode: () => void;

  goToProblemDetail: () => void;
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
  const goToChatInterview = () => push(RoutingPages.chatInterview);
  const goToOpenSource = () => push(RoutingPages.openSource);
  const goToHistory = () => push(RoutingPages.history);
  const goToModes = () => push(RoutingPages.modes);

  const goToForbidden = () => push(RoutingPages.forbidden);

  const goToLeetcodeProblems = () => push(RoutingPages.leetcodeProblems);

  const goToChatLeetCode = () => push(RoutingPages.chatLeetCode);

  const goToProblemDetail = () => push(RoutingPages.problemDetail);

  const openChatSettingsModal = () => router.pushModal(Modals.chatSettings);
  const openApplicationInfo = () => router.pushModal(Modals.applicationInfo);

  const openInterviewQuestions = () =>
    router.pushModal(Modals.interviewQuestions);

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
        goToChatInterview,
        openInterviewQuestions,
        goToLeetcodeProblems,
        goToChatLeetCode,
        goToProblemDetail,
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
