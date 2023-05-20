import React from "react";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import ApplyAlert from "./ApplyAlert";
import Submit from "./Submit";
import SystemMessageForm from "./SystemMessageForm";

import useChatSettings from "./hooks/useChatSettings";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function ChatSettings({ id }: IProps) {
  const { goBack } = useNavigationContext();

  const {
    isDirty,
    showAlert,
    systemMessageValue,
    isChangedSystemMessage,
    applySettings,
    resetSystemMessage,
    updateSystemMessage,
    onSubmit,
    closeAlert,
  } = useChatSettings();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        maxHeight
        isSecondary
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Настройка чата
          </PanelHeader>
        }
      >
        <SystemMessageForm
          isChangedSystemMessage={isChangedSystemMessage}
          resetSystemMessage={resetSystemMessage}
          systemMessageValue={systemMessageValue}
          updateSystemMessage={updateSystemMessage}
        />
        <Submit onSubmit={onSubmit} disabled={!isDirty} />
        {showAlert && (
          <ApplyAlert applySettings={applySettings} closeAlert={closeAlert} />
        )}
      </AppContainer>
    </Panel>
  );
}

export default ChatSettings;
