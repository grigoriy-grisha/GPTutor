import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { Page, Router, RouterContext } from "@happysanta/router";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import Bugsnag from "@bugsnag/js";
import "dignals-react";

import { OnboardingService } from "$/services/OnboardingService";

import App from "./App";

import ErrorBoundaryApp from "./ErrorBoundaryApp";
import { Panels, RoutingPages, Views } from "./entity/routing";

bridge.send("VKWebAppInit").then(() => {
  import("./eruda").then(() => {
    const onboardingService = new OnboardingService();
    onboardingService.runOnBoarding();
  });
});

const routes = {
  [RoutingPages.home]: new Page(Panels.home, Views.viewMain),
  [RoutingPages.chapters]: new Page(Panels.chapters, Views.viewMain),
  [RoutingPages.chat]: new Page(Panels.chat, Views.viewMain),
  [RoutingPages.openSource]: new Page(Panels.openSource, Views.viewMain),
  [RoutingPages.chatSettings]: new Page(Panels.chatSettings, Views.viewMain),
  [RoutingPages.history]: new Page(Panels.history, Views.viewMain),
  [RoutingPages.modes]: new Page(Panels.modes, Views.viewMain),
};

if (process.env.NODE_ENV === "production") {
  Bugsnag.start({
    apiKey: String(process.env.REACT_APP_BUGSNAG_API_KEY),
    plugins: [new BugsnagPluginReact()],
  });
}

const router = new Router(routes);

router.start();

ReactDOM.render(
  <ErrorBoundaryApp>
    <RouterContext.Provider value={router}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </RouterContext.Provider>
  </ErrorBoundaryApp>,
  document.getElementById("root")
);
