import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import "dignals-react";

import App from "./App";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import Bugsnag from "@bugsnag/js";
import ErrorBoundaryApp from "./ErrorBoundaryApp";

bridge.send("VKWebAppInit");

if (process.env.NODE_ENV === "production") {
  Bugsnag.start({
    apiKey: String(process.env.REACT_APP_BUGSNAG_API_KEY),
    plugins: [new BugsnagPluginReact()],
  });
}

ReactDOM.render(
  <ErrorBoundaryApp>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </ErrorBoundaryApp>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
  import("./eruda"); //runtime download
}
