import { useEffect } from "react";
import {
  Epic,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  View,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import { OneDark } from "./themes/OneDark";
import { OneLight } from "./themes/OneLight";
import { ThemeProvider } from "./contexts/ThemeContext";

import { Home, Models, Persik, Profile, Chat } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes.ts";
import {
  Icon28HomeOutline,
  Icon28MessageOutline,
  Icon28UserCircleOutline,
} from "@vkontakte/icons";

import "./App.css";
import { userViewModel } from "./viewModels/UserViewModel.ts";

export const App = () => {
  const { view: activeView, panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();

  const vkAppearance = useAppearance();
  const isDarkTheme = vkAppearance === "dark";

  useEffect(() => {
    userViewModel.getUser();
  }, []);

  return (
    <ThemeProvider isDarkTheme={isDarkTheme}>
      <SplitLayout>
        <SplitCol>
          <Epic
            activeStory={activeView || "home"}
            tabbar={
              activeView !== "chat" ? (
                <Tabbar>
                  <TabbarItem
                    selected={activeView === "home" || !activeView}
                    onClick={() => routeNavigator.push("/")}
                    label="Главная"
                  >
                    <Icon28HomeOutline />
                  </TabbarItem>
                  <TabbarItem
                    selected={activeView === "profile"}
                    onClick={() =>
                      routeNavigator.push(`/${DEFAULT_VIEW_PANELS.PROFILE}`)
                    }
                    label="Профиль"
                  >
                    <Icon28UserCircleOutline />
                  </TabbarItem>
                  <TabbarItem
                    selected={activeView === "chat"}
                    onClick={() =>
                      routeNavigator.push(`/${DEFAULT_VIEW_PANELS.CHAT}`)
                    }
                    label="Чат"
                  >
                    <Icon28MessageOutline />
                  </TabbarItem>
                </Tabbar>
              ) : null
            }
          >
            <View id="home" activePanel={activePanel}>
              <Home id="home" />
              <Persik id="persik" />
              <Models id="models" />
            </View>
            <View id="profile" activePanel={activePanel}>
              <Profile id="profile" />
            </View>
            <View id="chat" activePanel={activePanel}>
              <Chat id="chat" />
            </View>
          </Epic>
        </SplitCol>
        {/*{userViewModel.loading ? <ScreenSpinner /> : null}*/}

        {/* Code Themes */}
        {isDarkTheme ? <OneDark /> : <OneLight />}
      </SplitLayout>
    </ThemeProvider>
  );
};
