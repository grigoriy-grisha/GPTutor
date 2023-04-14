import React, { useEffect } from "react";
import { useConfigProvider, View } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { vkUserModel } from "./entity/user";
import { useAppNavigation } from "./hooks";
import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { Chat } from "./panels/Chat";

function togglePrismTheme(theme?: string) {
  let prismTheme;

  if (!theme) return;
  try {
    prismTheme = require(`prism-theme-one-light-dark/prism-one${theme}.css`);
  } catch (e) {
    console.error(e);
  }

  return prismTheme;
}

const App = () => {
  const { activePanel, goBack, goToPage, history } = useAppNavigation("home");

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then((user) => vkUserModel.fill(user));
  }, []);

  const goToChapters = () => goToPage("chapters");
  const goToChat = () => goToPage("chat");

  const { appearance } = useConfigProvider();

  useEffect(() => togglePrismTheme(appearance), [appearance]);

  return (
    <View
      id="view"
      activePanel={activePanel.get()}
      onSwipeBack={goBack}
      history={history.get()}
    >
      <Home id="home" goToChapters={goToChapters} goToChat={goToChat} />
      <Chapters id="chapters" goToChat={goToChat} goBack={goBack} />
      <Chat id="chat" goBack={goBack} />
    </View>
  );
};
export default App;
