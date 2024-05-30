import { AppPanelHeader } from "$/components/AppPanelHeader";
import {
  Appearance,
  ConfigProvider,
  Panel,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { FullscreenButton } from "$/components/FullscreenButton";
import React from "react";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function BingPanel({ id }: IProps) {
  const { goBack } = useNavigationContext();

  return (
    <ConfigProvider appearance={Appearance.LIGHT}>
      <Panel id={id}>
        <AppContainer
          headerChildren={
            <AppPanelHeader
              isMiddle
              before={<PanelHeaderBack onClick={goBack} />}
              after={<FullscreenButton />}
            >
              Bing
            </AppPanelHeader>
          }
          childrenWithHeight={(height) => (
            <div style={{ width: "100vh", height }}>
              <iframe
                style={{ overflow: "hidden", height: "100%", width: "100%" }}
                height="100%"
                width="100%"
                src="https://greff3-bingo.hf.space/"
              />
            </div>
          )}
        ></AppContainer>
      </Panel>
    </ConfigProvider>
  );
}

export default BingPanel;
