import React from "react";

import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Separator,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";

import { chatGpt } from "$/entity/GPT";

import SystemMessageForm from "./SystemMessageForm";

import useChatSettings from "./hooks/useChatSettings";
import { useNavigationContext } from "$/NavigationContext";

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
    <ModalPage settlingHeight={100} id={id}>
      <ModalPageHeader
        before={
          sizeX.compact && (
            <PanelHeaderClose
              className={sizeX.compact.className}
              onClick={goBack}
            />
          )
        }
        after={<PanelHeaderSubmit onClick={onSubmit} disabled={!isDirty} />}
      >
        Настройка чата
      </ModalPageHeader>
      <Separator wide />
      <SystemMessageForm
        clearSystemMessage={clearSystemMessage}
        initialSystemMessage={initialSystemMessage}
        isChangedSystemMessage={isChangedSystemMessage}
        resetSystemMessage={resetSystemMessage}
        systemMessageValue={systemMessageValue}
        updateSystemMessage={updateSystemMessage}
      />
    </ModalPage>
  );
}

export default ChatSettings;
