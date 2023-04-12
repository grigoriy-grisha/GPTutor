import React, { useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { useAppNavigation } from "./hooks";
import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { Chat } from "./panels/Chat";

const App = () => {
  const { activePanel, goBack, goToPage, history } = useAppNavigation("home");

  const [fetchedUser, setUser] = useState<any>(null);

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then(setUser);
  }, []);

  const goToChapters = () => goToPage("chapters");
  const goToChat = () => goToPage("chat");

  return (
    <View
      id="view"
      activePanel={activePanel}
      onSwipeBack={goBack}
      history={history}
    >
      <Home id="home" goToChapters={goToChapters} goToChat={goToChat} />
      <Chapters id="chapters" goToChat={goToChat} goBack={goBack} />
      <Chat id="chat" goBack={goBack} user={fetchedUser} />
    </View>
  );
};
export default App;
