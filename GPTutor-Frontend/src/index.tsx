import "dignals-react/jsxPatch17";
import "./env.js";

import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { Page, Router, RouterContext } from "@happysanta/router";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import "react-virtualized/styles.css";

import App from "./App";

import ErrorBoundaryApp from "./ErrorBoundaryApp";
import { Panels, RoutingPages, Views } from "./entity/routing";
import { OnboardingService } from "./services/OnboardingService";
import { NavigationContextProvider } from "$/NavigationContext";
import { adService } from "$/services/AdService";
import { authService } from "$/services/AuthService";
import { groupsService } from "$/services/GroupsService";
import { appService } from "$/services/AppService";
import { subscriptionsController } from "$/entity/subscriptions";
import { imageGeneration } from "$/entity/image";
import { VkStorageService } from "$/services/VkStorageService";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { userAgreement } from "$/entity/user/UserAgreement";
const isFirstVisitFlagName = "isFirstVisit";

const storageService = new VkStorageService();

bridge
  .send("VKWebAppInit")
  .then(async () => {
    if (process.env.NODE_ENV === "development") {
      import("./eruda");
    }

    storageService.get(isFirstVisitFlagName).then((value) => {
      if (value) return;

      const onboardingService = new OnboardingService();
      onboardingService.runOnBoarding();
      storageService.set(isFirstVisitFlagName, String(true));
    });

    await userAgreement.getUserImageAgreement();

    let isDon = false;
    if (appService.isGPTutor()) {
      await authService.setupToken("groups");
      isDon = !!(await groupsService.checkIsDon());
    }

    await subscriptionsController.getSubscription();

    if (isDon || !subscriptionsController.isDisable()) {
      await adService.hideBannerAd();
    } else {
      await adService.showBannerAd();
    }

    imageGeneration.init();

    appService.toggleLoading();
  })
  .catch(console.log);

const routes = {
  [RoutingPages.home]: new Page(Panels.home, Views.viewMain),
  [RoutingPages.chapters]: new Page(Panels.chapters, Views.viewMain),
  [RoutingPages.chatFree]: new Page(Panels.chatFree, Views.viewMain),
  [RoutingPages.chatLesson]: new Page(Panels.chatLesson, Views.viewMain),
  [RoutingPages.chatInterview]: new Page(Panels.chatInterview, Views.viewMain),
  [RoutingPages.openSource]: new Page(Panels.openSource, Views.viewMain),
  [RoutingPages.history]: new Page(Panels.history, Views.viewMain),
  [RoutingPages.modes]: new Page(Panels.modes, Views.viewMain),
  [RoutingPages.forbidden]: new Page(Panels.forbidden, Views.viewMain),
  [RoutingPages.chatLeetCode]: new Page(Panels.chatLeetCode, Views.viewMain),
  [RoutingPages.problemDetail]: new Page(Panels.problemDetail, Views.viewMain),
  [RoutingPages.editor]: new Page(Panels.editor, Views.viewMain),
  [RoutingPages.chatTrainer]: new Page(Panels.chatTrainer, Views.viewMain),
  [RoutingPages.chatSettings]: new Page(Panels.chatSettings, Views.viewMain),
  [RoutingPages.generationImages]: new Page(
    Panels.generationImages,
    Views.viewMain
  ),
  [RoutingPages.generationImagesResult]: new Page(
    Panels.generationImagesResult,
    Views.viewMain
  ),
  [RoutingPages.leetcodeProblems]: new Page(
    Panels.leetcodeProblems,
    Views.viewMain
  ),
  [RoutingPages.generationImagesExamples]: new Page(
    Panels.generationImagesExamples,
    Views.viewMain
  ),
  [RoutingPages.generationImagesPrompts]: new Page(
    Panels.generationImagesPrompts,
    Views.viewMain
  ),
  [RoutingPages.gallery]: new Page(Panels.gallery, Views.viewMain),
  [RoutingPages.publishingImages]: new Page(
    Panels.publishingImages,
    Views.viewMain
  ),
  [RoutingPages.profile]: new Page(Panels.profile, Views.viewMain),
  [RoutingPages.detailImage]: new Page(Panels.detailImage, Views.viewMain),
};

const router = new Router(routes);

router.start();

ReactDOM.render(
  <RouterContext.Provider value={router}>
    <NavigationContextProvider>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </NavigationContextProvider>
  </RouterContext.Provider>,
  document.getElementById("root")
);
