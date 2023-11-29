import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";

import Subscription from "$/panels/Profile/Subscription/Subscription";

interface IProps {
  id: string;
}

function Profile({ id }: IProps) {
  return (
    <Panel id={id}>
      <AppContainer headerChildren={<PanelHeader>Профиль</PanelHeader>}>
        <Subscription />
      </AppContainer>
    </Panel>
  );
}

export default Profile;
