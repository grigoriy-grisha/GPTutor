import classes from "$/panels/Home/Home.module.css";
import {
  Platform,
  Separator,
  Tabbar,
  TabbarItem,
  usePlatform,
} from "@vkontakte/vkui";
import {
  Icon28BookSpreadOutline,
  Icon28HistoryBackwardOutline,
} from "@vkontakte/icons";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  setRef: (ref: HTMLDivElement) => void;
}
function TabbarApp({ setRef }: IProps) {
  const { goToModes, goToHistory } = useNavigationContext();

  const platform = usePlatform();

  return (
    <Tabbar
      className={classes.tabBar}
      mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
    >
      <Separator wide style={{ width: "100%" }} />
      <div
        ref={setRef}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TabbarItem
          className={classes.tabItem}
          text="Режимы "
          onClick={goToModes}
        >
          <Icon28BookSpreadOutline />
        </TabbarItem>
        <TabbarItem
          className={classes.tabItem}
          text="История диалогов"
          onClick={goToHistory}
        >
          <Icon28HistoryBackwardOutline />
        </TabbarItem>
      </div>
    </Tabbar>
  );
}

export default TabbarApp;
