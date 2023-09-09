import "./env-config.js";
import "dignals-react/jsxPatch17";

import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { Page, Router, RouterContext } from "@happysanta/router";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";

import App from "./App";

import ErrorBoundaryApp from "./ErrorBoundaryApp";
import { Panels, RoutingPages, Views } from "./entity/routing";
import { StorageService } from "./services/StorageService";
import { OnboardingService } from "./services/OnboardingService";
import { NavigationContextProvider } from "$/NavigationContext";
import { adService } from "$/services/AdService";
import { authService } from "$/services/AuthService";
import { groupsService } from "$/services/GroupsService";
import { appService } from "$/services/AppService";

const isFirstVisitFlagName = "isFirstVisit";

const storageService = new StorageService();

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
      storageService.set(isFirstVisitFlagName, true);
    });

    await authService.setupToken();
    const isDon = await groupsService.checkIsDon();

    if (!isDon) {
      adService.showBannerAd();
    }

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
  [RoutingPages.leetcodeProblems]: new Page(
    Panels.leetcodeProblems,
    Views.viewMain
  ),
};

const router = new Router(routes);

router.start();

ReactDOM.render(
  <ErrorBoundaryApp>
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
    </RouterContext.Provider>
  </ErrorBoundaryApp>,
  document.getElementById("root")
);
