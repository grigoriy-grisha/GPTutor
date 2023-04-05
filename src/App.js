import React, { useEffect, useState } from "react";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";
import bridge from "@vkontakte/vk-bridge";

import Main from "./panels/Main";
import { Home } from "./panels/Home";
import Chapters from "./panels/Chapters";
import { useSubscribe } from "./hooks";
import { lessonsController } from "./entity/lessons";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");

  const [fetchedUser, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  const goToChapters = () => {
    setActivePanel("chapters");
  };

  const goToMain = () => {
    setActivePanel("main");
  };

  const goToHome = () => {
    setActivePanel("home");
  };

  useSubscribe(lessonsController.currentChapter$);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  id="home"
                  goToChapters={goToChapters}
                  goToMain={goToMain}
                />
                <Chapters id="chapters" goToMain={goToMain} goBack={goToHome} />
                <Main
                  id="main"
                  goBack={
                    lessonsController.currentChapter$.getValue()
                      ? goToChapters
                      : goToHome
                  }
                  user={fetchedUser}
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
