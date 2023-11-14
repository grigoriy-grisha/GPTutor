import React from "react";

import { Banner, Image, Panel, PanelHeaderBack } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import { vkUser } from "$/entity/user";

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
        <Banner
          before={<Image src={vkUser.photo_200} />}
          title={`${vkUser.first_name} ${vkUser.last_name}`}
        ></Banner>
      </AppContainer>
    </Panel>
  );
}

export default Profile;
