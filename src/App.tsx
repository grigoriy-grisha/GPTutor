import React, { useEffect } from "react";
import { useConfigProvider, View } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { useLocation } from "@happysanta/router";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { vkUserModel } from "./entity/user";

import { OneDark } from "./OneDark";
import { OneLight } from "./OneLight";
import { Panels, Views } from "./entity/routing";

import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { Chat } from "./panels/Chat";
import { OpenSource } from "./panels/OpenSource";
import { ChatSettings } from "./panels/ChatSettings";
import { History } from "./panels/History";
import { ForbiddenPage } from "$/panels/ForbiddenPage";
import { Modes } from "./panels/Modes";

import { useNavigationContext } from "$/NavigationContext";
import { applicationUser } from "$/entity/user/ApplicationUser";
import { SnackbarNotifier } from "$/components/SnackbarNotifier";

const App = () => {
  const location = useLocation();
  const { goBack, goToForbidden } = useNavigationContext();
  const { appearance } = useConfigProvider();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") applicationUser.loadUser(0);

    bridge
      .send("VKWebAppGetUserInfo")
      .then((user) => {
        vkUserModel.fill(user);
        applicationUser.loadUser(user.id);
      })
      .catch(goToForbidden);
  }, []);

  const fetchUserIsDone = applicationUser.createUser$.done.get();

  useEffect(() => {
    if (fetchUserIsDone && !applicationUser.user) goToForbidden();
  }, [fetchUserIsDone]);

  const history = location.hasOverlay()
    ? []
    : location.getViewHistory(Views.viewMain);

  return (
    <>
      {appearance === "dark" ? <OneDark /> : <OneLight />}
      <View
        id={Views.viewMain}
        activePanel={location.getViewActivePanel(Views.viewMain)!}
        onSwipeBack={goBack}
        history={history}
      >
        <ForbiddenPage id={Panels.forbidden} />
        <Home id={Panels.home} />
        <Chapters id={Panels.chapters} />
        <Chat id={Panels.chat} />
        <OpenSource id={Panels.openSource} />
        <ChatSettings id={Panels.chatSettings} />
        <History id={Panels.history} />
        <Modes id={Panels.modes} />
      </View>
      <SnackbarNotifier />
    </>
  );
};

export default App;
