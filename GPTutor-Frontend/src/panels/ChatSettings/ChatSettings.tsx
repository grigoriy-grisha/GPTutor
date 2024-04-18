import React from "react";

import { Panel, PanelHeaderBack, PanelHeaderSubmit } from "@vkontakte/vkui";

import { chatGpt } from "$/entity/GPT";

import SystemMessageForm from "./SystemMessageForm";

import useChatSettings from "./hooks/useChatSettings";
import { useNavigationContext } from "$/NavigationContext";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { TabsContainer } from "$/components/TabsContainer";
import { ModelsForm } from "$/panels/ChatSettings/ModelsForm";

interface IProps {
  id: string;
}

function ChatSettings({ id }: IProps) {
  const { goBack } = useNavigationContext();

  const gpt = chatGpt.getCurrentChatGpt();

  const {
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
        withoutTabbar
        headerChildren={
          <AppPanelHeader
            before={<PanelHeaderBack onClick={goBack} />}
            after={<PanelHeaderSubmit onClick={onSubmit} />}
          >
            Настройки
          </AppPanelHeader>
        }
      >
        <TabsContainer
          tabs={[
            { id: "models", title: "Модели", content: <ModelsForm /> },
            {
              id: "system",
              title: "Системное сообщение",
              content: (
                <SystemMessageForm
                  clearSystemMessage={clearSystemMessage}
                  initialSystemMessage={initialSystemMessage}
                  isChangedSystemMessage={isChangedSystemMessage}
                  resetSystemMessage={resetSystemMessage}
                  systemMessageValue={systemMessageValue}
                  updateSystemMessage={updateSystemMessage}
                />
              ),
            },
          ]}
        />
      </AppContainer>
    </Panel>
  );
}

export default ChatSettings;
