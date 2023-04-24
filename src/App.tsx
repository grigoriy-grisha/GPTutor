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
import { OpenSource } from "./panels/OpenSource";
import { OneDark } from "./OneDark";
import { OneLight } from "./OneLight";

const App = () => {
  const { activePanel, goBack, goToPage, history } = useAppNavigation("home");

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then((user) => vkUserModel.fill(user));
  }, []);

  const goToChapters = () => goToPage("chapters");
  const goToChat = () => goToPage("chat");
  const goToOpenSource = () => goToPage("open-source");

  const { appearance } = useConfigProvider();

  return (
    <>
      {appearance === "dark" ? <OneDark /> : <OneLight />}
      <View
        id="view"
        activePanel={activePanel.get()}
        onSwipeBack={goBack}
        history={history.get()}
      >
        <Home
          id="home"
          goToChapters={goToChapters}
          goToChat={goToChat}
          goToOpenSource={goToOpenSource}
        />
        <Chapters id="chapters" goToChat={goToChat} goBack={goBack} />
        <Chat id="chat" goBack={goBack} />
        <OpenSource
          id="open-source"
          goBack={goBack}
          goToChapters={goToChapters}
        />
      </View>
    </>
  );
};
export default App;
