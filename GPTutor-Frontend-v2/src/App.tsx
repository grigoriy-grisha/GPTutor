import { ReactNode, useEffect, useState } from "react";
import {
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  View,
  Epic,
  Tabbar,
  TabbarItem,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { useAppearance } from "@vkontakte/vk-bridge-react";
import "./App.css";
import { OneDark } from "./themes/OneDark";
import { OneLight } from "./themes/OneLight";
import { ThemeProvider } from "./contexts/ThemeContext";

import { Home, Persik, Profile, Chat } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes.ts";
import {
  Icon28HomeOutline,
  Icon28UserCircleOutline,
  Icon28MessageOutline,
} from "@vkontakte/icons";

export const App = () => {
  const { view: activeView, panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);
  const routeNavigator = useRouteNavigator();
  
  // Получаем тему от VK
  const vkAppearance = useAppearance();
  const isDarkTheme = vkAppearance === 'dark';

  useEffect(() => {
    async function fetchData() {
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider isDarkTheme={isDarkTheme}>
      <SplitLayout>
        <SplitCol>
          <Epic
            activeStory={activeView || 'home'}
            tabbar={
              <Tabbar>
                <TabbarItem
                  selected={activeView === 'home' || !activeView}
                  onClick={() => routeNavigator.push('/')}
                  label="Главная"
                >
                  <Icon28HomeOutline />
                </TabbarItem>
                <TabbarItem
                  selected={activeView === 'profile'}
                  onClick={() =>
                    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.PROFILE}`)
                  }
                  label="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
                <TabbarItem
                  selected={activeView === 'chat'}
                  onClick={() =>
                    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.CHAT}`)
                  }
                  label="Чат"
                >
                  <Icon28MessageOutline />
                </TabbarItem>
              </Tabbar>
            }
          >
            <View id="home" activePanel={activePanel}>
              <Home id="home" />
              <Persik id="persik" />
            </View>
            <View id="profile" activePanel={activePanel}>
              <Profile id="profile" />
            </View>
            <View id="chat" activePanel={activePanel}>
              <Chat id="chat" />
            </View>
          </Epic>
        </SplitCol>
        {popout}
        
        {/* Code Themes */}
        {isDarkTheme ? <OneDark /> : <OneLight />}
      </SplitLayout>
    </ThemeProvider>
  );
};
