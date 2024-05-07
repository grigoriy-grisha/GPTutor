import classes from "$/panels/Home/Home.module.css";
import {
  classNames,
  Platform,
  Separator,
  Tabbar,
  TabbarItem,
  usePlatform,
} from "@vkontakte/vkui";
import {
  Icon20PictureStack,
  Icon24MagicWandOutline,
  Icon28BookSpreadOutline,
  Icon28HistoryBackwardOutline,
  Icon28NewsfeedLinesOutline,
  Icon28UserRectangleHorizontalOutline,
} from "@vkontakte/icons";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";
import { appService } from "$/services/AppService";
import { useLocation } from "@happysanta/router";
import { Panels, Views } from "$/entity/routing";

interface IProps {
  setRef: (ref: HTMLDivElement) => void;
}

function TabbarApp({ setRef }: IProps) {
  const {
    goToModes,
    goToHistory,
    goToGallery,
    goToGPTutorProfileReplace,
    goToGenerationImages,
  } = useNavigationContext();

  const platform = usePlatform();
  const location = useLocation();

  const activePanel = location.getViewActivePanel(Views.viewMain);

  if (appService.isStableArt()) {
    return (
      <Tabbar
        className={classes.tabBar}
        style={{ display: "grid" }}
        mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
      >
        <Separator wide style={{ width: "100%" }} />
        <div
          ref={setRef}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <TabbarItem
            className={classNames(classes.tabItem, {
              [classes.tabItemActive]: activePanel === Panels.generationImages,
            })}
            text="Генератор"
            onClick={goToGenerationImages}
          >
            <Icon24MagicWandOutline width={28} height={28} />
          </TabbarItem>
          <TabbarItem
            className={classNames(classes.tabItem, {
              [classes.tabItemActive]: activePanel === Panels.gallery,
            })}
            text="Коллекция"
            onClick={goToGallery}
          >
            <Icon20PictureStack width={28} height={28} />
          </TabbarItem>
        </div>
      </Tabbar>
    );
  }

  return (
    <Tabbar
      style={{ display: "grid" }}
      className={classes.tabBar}
      mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
    >
      <Separator wide style={{ width: "100%" }} />
      <div
        ref={setRef}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TabbarItem
          className={classNames(classes.tabItem, {
            [classes.tabItemActive]: activePanel === Panels.modes,
          })}
          text="Режимы"
          onClick={goToModes}
        >
          <Icon28BookSpreadOutline />
        </TabbarItem>
        <TabbarItem
          className={classNames(classes.tabItem, {
            [classes.tabItemActive]: activePanel === Panels.gptutorProfile,
          })}
          text="Профиль"
          onClick={goToGPTutorProfileReplace}
        >
          <Icon28UserRectangleHorizontalOutline />
        </TabbarItem>
        <TabbarItem
          className={classNames(classes.tabItem, {
            [classes.tabItemActive]: activePanel === Panels.history,
          })}
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
