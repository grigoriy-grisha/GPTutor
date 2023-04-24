import React, { useEffect } from "react";
import { useConfigProvider, View } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { vkUserModel } from "./entity/user";
import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { Chat } from "./panels/Chat";
import { OpenSource } from "./panels/OpenSource";
import { OneDark } from "./OneDark";
import { OneLight } from "./OneLight";
import { Panels, RoutingPages, Views } from "./entity/routing";
import { useLocation, useRouter } from "@happysanta/router";

const App = () => {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then((user) => vkUserModel.fill(user));
  }, []);

  const goBack = () => router.popPage();
  const goToChapters = () => router.pushPage(RoutingPages.chapters);
  const goToChat = () => router.pushPage(RoutingPages.chat);
  const goToOpenSource = () => router.pushPage(RoutingPages.openSource);

  const { appearance } = useConfigProvider();

  return (
    <>
      {appearance === "dark" ? <OneDark /> : <OneLight />}
      <View
        id={Views.viewMain}
        activePanel={location.getViewActivePanel(Views.viewMain)!}
        onSwipeBack={goBack}
      >
        <Home
          id={Panels.home}
          goToChapters={goToChapters}
          goToChat={goToChat}
          goToOpenSource={goToOpenSource}
        />
        <Chapters id={Panels.chapters} goToChat={goToChat} goBack={goBack} />
        <Chat id={Panels.chat} goBack={goBack} />
        <OpenSource
          id={Panels.openSource}
          goBack={goBack}
          goToChapters={goToChapters}
        />
      </View>
    </>
  );
};
export default App;
