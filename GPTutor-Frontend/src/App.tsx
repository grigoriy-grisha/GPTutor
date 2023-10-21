import React, { useEffect } from "react";
import {
  ModalRoot,
  SplitLayout,
  useConfigProvider,
  View,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { useLocation } from "@happysanta/router";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { vkUserModel } from "./entity/user";
import { online } from "./api/online";

import { OneDark } from "./OneDark";
import { OneLight } from "./OneLight";
import { Modals, Panels, Views } from "./entity/routing";

import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { OpenSource } from "./panels/OpenSource";
import { History } from "./panels/History";
import { Modes } from "./panels/Modes";

import { useNavigationContext } from "./NavigationContext";
import { SnackbarNotifier } from "./components/SnackbarNotifier";
import { ChatSettings } from "./panels/ChatSettings";
import { ApplicationInfo } from "./modals/ApplicationInfo";
import { ChatFree } from "./panels/ChatFree";
import { ChatLesson } from "./panels/ChatLesson";
import { ChatInterview } from "./panels/ChatInterview";
import { InterviewQuestions } from "./modals/InterviewQuestions";
import { LeetcodeProblems } from "./panels/LeetCodeProblems";
import { ChatLeetCode } from "./panels/ChatLeetCode";
import { ProblemDetail } from "./panels/ProblemDetail";
import { AppAlert } from "./modals/AppAlert";
import { CodeEditor } from "./panels/CodeEditor";
import { ChatTrainer } from "./panels/ChatTrainer";
import { ImageGenerationResult } from "./panels/ImageGenerationResult";
import UtilBlock from "./UtilBlock";

import { appService } from "$/services/AppService";
import { LoadingPanel } from "$/panels/LoadingPanel";
import { ImageGeneration } from "$/panels/ImageGeneration";
import { ImageGenerationExamples } from "$/panels/ImageGenerationExamples";
import Gallery from "$/panels/Gallery";
import ImageCreatePrompts from "$/panels/ImageCreatePrompts";

const App = () => {
  const location = useLocation();
  const { goBack, goToForbidden } = useNavigationContext();
  const { appearance } = useConfigProvider();

  useEffect(() => {
    bridge
      .send("VKWebAppGetUserInfo")
      .then((user) => vkUserModel.fill(user))
      .catch(goToForbidden);
  }, []);

  useEffect(() => {
    online();
  }, []);

  const history = location.hasOverlay()
    ? []
    : location.getViewHistory(Views.viewMain);

  return (
    <>
      {appearance === "dark" ? <OneDark /> : <OneLight />}
      <SplitLayout
        popout={
          <>
            <AppAlert id={Modals.alert} />
          </>
        }
        modal={
          <ModalRoot activeModal={location.getModalId()} onClose={goBack}>
            <ApplicationInfo id={Modals.applicationInfo} />
            <InterviewQuestions id={Modals.interviewQuestions} />
          </ModalRoot>
        }
      >
        {appService.loading.get() ? (
          <LoadingPanel />
        ) : (
          <View
            id={Views.viewMain}
            activePanel={location.getViewActivePanel(Views.viewMain)!}
            onSwipeBack={goBack}
            history={history}
          >
            <ChatSettings id={Panels.chatSettings} />
            <CodeEditor id={Panels.editor} />
            <ChatTrainer id={Panels.chatTrainer} />
            <Home id={Panels.home} />
            <Chapters id={Panels.chapters} />
            <ChatFree id={Panels.chatFree} />
            <ChatLesson id={Panels.chatLesson} />
            <ChatInterview id={Panels.chatInterview} />
            <OpenSource id={Panels.openSource} />
            <History id={Panels.history} />
            <Modes id={Panels.modes} />
            <LeetcodeProblems id={Panels.leetcodeProblems} />
            <ChatLeetCode id={Panels.chatLeetCode} />
            <ProblemDetail id={Panels.problemDetail} />
            <ImageGeneration id={Panels.generationImages} />
            <ImageGenerationResult id={Panels.generationImagesResult} />
            <ImageGenerationExamples id={Panels.generationImagesExamples} />
            <Gallery id={Panels.gallery} />
            <ImageCreatePrompts id={Panels.generationImagesPrompts} />
          </View>
        )}
      </SplitLayout>
      <UtilBlock />
      <SnackbarNotifier />
    </>
  );
};

export default App;
