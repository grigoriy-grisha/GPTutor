import { useRef, useState } from "react";
import { useRouter } from "@happysanta/router";

import { chatGpt } from "$/entity/GPT";

function useChatSettings() {
  const router = useRouter();
  const systemMessageContent = chatGpt.systemMessage.content$;
  const systemMessage = systemMessageContent.get();

  const [systemMessageValue, setSystemMessageValue] = useState(systemMessage);
  const [showAlert, setShowAlert] = useState(false);
  const initialMessage = useRef(systemMessage);

  const isDirty = initialMessage.current !== systemMessage;

  const isChangedSystemMessage =
    chatGpt.initialSystemContent === systemMessageValue;

  const resetSystemMessage = () => {
    chatGpt.clearSystemMessage();
    setSystemMessageValue(systemMessageContent.get());
  };

  const updateSystemMessage = (value: string) => {
    setSystemMessageValue(value);
  };

  const onSubmit = () => {
    if (chatGpt.messages$.get().length === 0) {
      systemMessageContent.set(systemMessageValue);
      router.popPage();
      return;
    }

    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const applySettings = () => {
    chatGpt.clearMessages();
    systemMessageContent.set(systemMessageValue);
    router.popPage();
  };

  return {
    isDirty,
    showAlert,
    systemMessageValue,
    isChangedSystemMessage,
    resetSystemMessage,
    updateSystemMessage,
    onSubmit,
    applySettings,
    closeAlert,
  };
}

export default useChatSettings;
