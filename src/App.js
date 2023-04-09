import React, { useEffect, useState } from "react";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { Chat } from "./panels/Chat";
import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { useAppNavigation, useSubscribe } from "./hooks";
import { lessonsController } from "./entity/lessons";

const App = () => {
  const { activePanel, goBack, goToPage } = useAppNavigation(["home"]);

  useSubscribe(lessonsController.currentChapter$);

  const [fetchedUser, setUser] = useState(null);

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then(setUser);
  }, []);

  const goToChapters = () => goToPage("chapters");
  const goToChat = () => goToPage("chat");

  return (
    <ConfigProvider isWebView>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel} onSwipeBack={goBack}>
                <Home
                  id="home"
                  goToChapters={goToChapters}
                  goToChat={goToChat}
                />
                <Chapters id="chapters" goToChat={goToChat} goBack={goBack} />
                <Chat id="chat" goBack={goBack} user={fetchedUser} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
