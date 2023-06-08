import React, { useEffect } from "react";
import {
  ModalRoot,
  SplitLayout,
  useConfigProvider,
  View,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { useLocation } from "@happysanta/router";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

import { vkUserModel } from "./entity/user";

import { OneDark } from "./OneDark";
import { OneLight } from "./OneLight";
import { Modals, Panels, Views } from "./entity/routing";

import { Home } from "./panels/Home";
import { Chapters } from "./panels/Chapters";
import { OpenSource } from "./panels/OpenSource";
import { History } from "./panels/History";
import { ForbiddenPage } from "$/panels/ForbiddenPage";
import { Modes } from "./panels/Modes";

import { useNavigationContext } from "$/NavigationContext";
import { applicationUser } from "$/entity/user/ApplicationUser";
import { SnackbarNotifier } from "$/components/SnackbarNotifier";
import { ChatSettings } from "$/modals/ChatSettings";
import { ApplicationInfo } from "$/modals/ApplicationInfo";
import { ChatFree } from "$/panels/ChatFree";
import { ChatLesson } from "$/panels/ChatLesson";

const App = () => {
  const location = useLocation();
  const { goBack, goToForbidden, isForbidden } = useNavigationContext();
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

  const history = location.hasOverlay()
    ? []
    : location.getViewHistory(Views.viewMain);

  if (isForbidden) {
    return <ForbiddenPage id={Panels.forbidden} />;
  }

  return (
    <>
      {appearance === "dark" ? <OneDark /> : <OneLight />}
      <SplitLayout
        modal={
          <ModalRoot activeModal={location.getModalId()} onClose={goBack}>
            <ChatSettings id={Modals.chatSettings} />
            <ApplicationInfo id={Modals.applicationInfo} />
          </ModalRoot>
        }
      >
        <View
          id={Views.viewMain}
          activePanel={location.getViewActivePanel(Views.viewMain)!}
          onSwipeBack={goBack}
          history={history}
        >
          <Home id={Panels.home} />
          <Chapters id={Panels.chapters} />
          <ChatFree id={Panels.chatFree} />
          <ChatLesson id={Panels.chatLesson} />
          <OpenSource id={Panels.openSource} />
          <History id={Panels.history} />
          <Modes id={Panels.modes} />
        </View>
      </SplitLayout>
      <SnackbarNotifier />
    </>
  );
};

export default App;
