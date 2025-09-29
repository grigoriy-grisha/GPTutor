import { ReactNode, useEffect, useState } from "react";
import { ScreenSpinner, SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, Persik, Models } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes.ts";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      // const user = await bridge.send("VKWebAppGetUserInfo");
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Persik id="persik" />
          <Models id="models" />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
