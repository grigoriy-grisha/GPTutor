import React, { useEffect } from "react";
import { View } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { vkUserModel } from "./entity/user";
import { useAppNavigation } from "./hooks";
import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { Chat } from "./panels/Chat";

const App = () => {
  const { activePanel, goBack, goToPage, history } = useAppNavigation("home");

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then(user => vkUserModel.fill(user));
  }, []);

  const goToChapters = () => goToPage("chapters");
  const goToChat = () => goToPage("chat");

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
