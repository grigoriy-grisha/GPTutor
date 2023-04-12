import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import App from "./App";

bridge.send("VKWebAppInit");

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <App />
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
  import("./eruda"); //runtime download
}
