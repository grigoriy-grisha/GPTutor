import React from "react";

import {
  Panel,
  PanelHeaderBack,
  PanelHeaderSubmit,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";

import { chatGpt } from "$/entity/GPT";

import SystemMessageForm from "./SystemMessageForm";

import useChatSettings from "./hooks/useChatSettings";
import { useNavigationContext } from "$/NavigationContext";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";

interface IProps {
  id: string;
}

function ChatSettings({ id }: IProps) {
  const { goBack } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();

  const gpt = chatGpt.getCurrentChatGpt();

  const {
    isDirty,
    systemMessageValue,
    isChangedSystemMessage,
    resetSystemMessage,
    clearSystemMessage,
    updateSystemMessage,
    onSubmit,
  } = useChatSettings(gpt);

  const initialSystemMessage = gpt.initialSystemContent;

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader
            before={<PanelHeaderBack onClick={goBack} />}
            after={<PanelHeaderSubmit onClick={onSubmit} disabled={!isDirty} />}
          >
            Настройки
          </AppPanelHeader>
        }
      >
        <SystemMessageForm
          clearSystemMessage={clearSystemMessage}
          initialSystemMessage={initialSystemMessage}
          isChangedSystemMessage={isChangedSystemMessage}
          resetSystemMessage={resetSystemMessage}
          systemMessageValue={systemMessageValue}
          updateSystemMessage={updateSystemMessage}
        />
      </AppContainer>
    </Panel>
  );
}

export default ChatSettings;
