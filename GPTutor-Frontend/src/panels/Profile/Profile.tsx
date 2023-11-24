import React from "react";

import { Panel, PanelHeaderBack } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";

import Subscription from "$/panels/Profile/Subscription/Subscription";

interface IProps {
  id: string;
}

function Profile({ id }: IProps) {
  const { goBack } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Профиль
          </AppPanelHeader>
        }
      >
        <Subscription />
      </AppContainer>
    </Panel>
  );
}

export default Profile;
