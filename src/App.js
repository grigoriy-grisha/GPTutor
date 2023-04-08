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

import { Main } from "./panels/Main";
import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { useSubscribe } from "./hooks";
import { lessonsController } from "./entity/lessons";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");

  const [fetchedUser, setUser] = useState(null);

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then(setUser);
  }, []);

  const goToChapters = () => {
    setActivePanel("chapters");
    bridge.send("VKWebAppSetLocation", {
      location: "chapters",
    });
    window.location.hash = "#chapters";
  };

  const goToMain = () => {
    setActivePanel("main");
    bridge.send("VKWebAppSetLocation", {
      location: "main",
    });
    window.location.hash = "#main";
  };

  const goToHome = () => {
    setActivePanel("home");
    bridge.send("VKWebAppSetLocation", {
      location: "home",
    });
    window.location.hash = "#home";
  };

  useSubscribe(lessonsController.currentChapter$);

  useEffect(() => {
    window.addEventListener("popstate", (event) => {
      setActivePanel(window.location.hash.slice(1) || "home");
    });
  }, []);
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View
                activePanel={activePanel}
                isWebView={true}
                onTransition={(a) => {
                  console.log(a);
                }}
              >
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
