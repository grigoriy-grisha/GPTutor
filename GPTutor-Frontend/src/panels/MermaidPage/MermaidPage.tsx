import React from "react";

import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Panel, PanelHeaderBack } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { mermaid } from "$/entity/mermaid";
import MermaidBlock from "$/components/MermaidBlock";
import { FullscreenButton } from "$/components/FullscreenButton";

import classes from "./MermaidPage.module.css";

interface IProps {
  id: string;
}

function MermaidPage({ id }: IProps) {
  const { goBack } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <AppPanelHeader
            before={<PanelHeaderBack onClick={goBack} />}
            after={<FullscreenButton />}
          >
            Mermaid
          </AppPanelHeader>
        }
      >
        <div className={classes.container}>
          <MermaidBlock id="mermaid" mmd={mermaid.getMermaidCode()} />
        </div>
      </AppContainer>
    </Panel>
  );
}

export default MermaidPage;
