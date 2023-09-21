import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useRouter } from "@happysanta/router";

import { Modals, Panels, RoutingPages, Views } from "$/entity/routing";
import { appService } from "$/services/AppService";

export type AlertType = {
  onAction: () => void;
  actionText: string;
  header: string;
  text: string;
};

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
  goToChatSettingsModal: () => void;
  openApplicationInfo: () => void;
  openInterviewQuestions: () => void;
  goToLeetcodeProblems: () => void;
  goToChatLeetCode: () => void;
  goToProblemDetail: () => void;
  goToGenerationImages: () => void;
  goToChatTrainer: () => void;
  goToEditor: () => void;
  goToGenerationImagesResult: () => void;
  goToGenerationImagesExamples: () => void;
  goToGallery: () => void;
  openAlert: (data: AlertType) => void;
  alert: AlertType;
  isForbidden: boolean;
};

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);

export function NavigationContextProvider({
  children,
}: PropsWithChildren<any>) {
  const [alert, setAlert] = useState<AlertType>({
    onAction: () => {},
    text: "",
    actionText: "",
    header: "",
  });

  const [isForbidden, setForbidden] = useState(false);

  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    if (appService.isStableArt()) {
      router.replacePage(RoutingPages.generationImages);
      return;
    }

    router.replacePage(RoutingPages.home);
  }, []);

  const activePanel = location.getViewActivePanel(Views.viewMain)!;

  function push(panel: RoutingPages, mode: "replace" | "push" = "push") {
    if (panel.slice(1) === activePanel) return;
    if (mode === "replace") {
      if (location.getViewHistory(Views.viewMain).length === 1) {
        router.pushPage(panel);
        return;
      }
    }

    router[`${mode}Page`](panel);
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
  const goToChatTrainer = () => push(RoutingPages.chatTrainer);
  const goToOpenSource = () => push(RoutingPages.openSource);

  const goToHistory = () => push(RoutingPages.history, "replace");

  const goToModes = () => push(RoutingPages.modes, "replace");

  const goToForbidden = () => push(RoutingPages.forbidden);

  const goToLeetcodeProblems = () => push(RoutingPages.leetcodeProblems);

  const goToGenerationImages = () => push(RoutingPages.generationImages);
  const goToGenerationImagesResult = () =>
    push(RoutingPages.generationImagesResult);
  const goToGenerationImagesExamples = () =>
    push(RoutingPages.generationImagesExamples);
  const goToGallery = () => push(RoutingPages.gallery);

  const goToChatLeetCode = () => {
    const problemPages = location
      .getViewHistory(Views.viewMain)
      .filter((item) => item === Panels.problemDetail);

    if (problemPages.length === 2) return goBack();

    push(RoutingPages.chatLeetCode);
  };

  const goToProblemDetail = () => {
    push(RoutingPages.problemDetail);
  };

  const goToEditor = () => {
    const editorRoutes = location
      .getViewHistory(Views.viewMain)
      .filter((item) => item === Panels.editor);

    if (editorRoutes.length > 1) {
      goBack();
      return;
    }

    push(RoutingPages.editor);
  };

  const goToChatSettingsModal = () => push(RoutingPages.chatSettings);
  const openApplicationInfo = () => router.pushModal(Modals.applicationInfo);

  const openAlert = (data: AlertType) => {
    setAlert(data);
    router.pushPopup(Modals.alert);
  };

  const openInterviewQuestions = () =>
    router.pushModal(Modals.interviewQuestions);

  return (
    <NavigationContext.Provider
      value={{
        goToGallery,
        goToGenerationImagesExamples,
        goBack,
        goToHistory,
        goToChapters,
        goToChatFree,
        goToChatLesson,
        goToModes,
        goToOpenSource,
        goToForbidden,
        goToChatSettingsModal,
        openApplicationInfo,
        goToChatInterview,
        openInterviewQuestions,
        goToLeetcodeProblems,
        goToEditor,
        goToChatLeetCode,
        goToProblemDetail,
        openAlert,
        goToChatTrainer,
        goToGenerationImages,
        goToGenerationImagesResult,
        alert,
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
