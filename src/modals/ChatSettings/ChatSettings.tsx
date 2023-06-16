import React from "react";

import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Separator,
  Spacing,
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

  const {
    isDirty,
    systemMessageValue,
    isChangedSystemMessage,
    resetSystemMessage,
    updateSystemMessage,
    onSubmit,
  } = useChatSettings(chatGpt.getCurrentChatGpt());

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
        isChangedSystemMessage={isChangedSystemMessage}
        resetSystemMessage={resetSystemMessage}
        systemMessageValue={systemMessageValue}
        updateSystemMessage={updateSystemMessage}
      />
      <Spacing size={200} />
    </ModalPage>
  );
}

export default ChatSettings;
