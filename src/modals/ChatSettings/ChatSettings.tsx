import React from "react";

import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Spacing,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";

import ApplyAlert from "./ApplyAlert";
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
      <SystemMessageForm
        isChangedSystemMessage={isChangedSystemMessage}
        resetSystemMessage={resetSystemMessage}
        systemMessageValue={systemMessageValue}
        updateSystemMessage={updateSystemMessage}
      />
      {showAlert && (
        <ApplyAlert applySettings={applySettings} closeAlert={closeAlert} />
      )}
      <Spacing size={200} />
    </ModalPage>
  );
}

export default ChatSettings;
