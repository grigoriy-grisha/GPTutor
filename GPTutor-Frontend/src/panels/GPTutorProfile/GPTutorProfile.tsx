import React from "react";
import { Panel, PanelHeaderBack } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { Subscription } from "./Subscription";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function GPTutorProfile({ id }: IProps) {
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

export default GPTutorProfile;
