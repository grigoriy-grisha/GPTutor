import * as React from "react";
import { Div, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import PanelTitle from "$/components/PanelTitle";

interface IProps {
  id: string;
}

function DocQuestionPanel({ id }: IProps) {
  const { goBack } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <PanelTitle title="Document AI" mobileTitle="Document AI" />
          </PanelHeader>
        }
      >
        <Div style={{ maxWidth: "calc(100vw - 16px - 16px)" }}>chlen</Div>
      </AppContainer>
    </Panel>
  );
}

export default DocQuestionPanel;
