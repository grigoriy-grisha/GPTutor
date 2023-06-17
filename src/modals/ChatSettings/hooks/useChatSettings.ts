import { useRef, useState } from "react";
import { useRouter } from "@happysanta/router";
import { snackbarNotify } from "$/entity/notify";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { useNavigationContext } from "$/NavigationContext";

function useChatSettings(chatGpt: ChatGptTemplate) {
  const { openAlert, goBack } = useNavigationContext();

  const router = useRouter();
  const systemMessageContent = chatGpt.systemMessage.content$;
  const systemMessage = systemMessageContent.get();

  const [systemMessageValue, setSystemMessageValue] = useState(systemMessage);
  const initialMessage = useRef(systemMessage);

  const isDirty = initialMessage.current !== systemMessageValue;

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

      snackbarNotify.notify({
        type: "success",
        message: "Системные настройки успешно изменены",
      });

      return;
    }

    openAlert({
      onAction: applySettings,
      actionText: "Применить настройки",
      header: "Подтвердите действие",
      text: "После изменения системных настроек будет создан новый диалог!",
    });
  };

  const applySettings = () => {
    snackbarNotify.notify({
      type: "success",
      message: "Системные настройки успешно изменены",
    });

    chatGpt.clearMessages();
    systemMessageContent.set(systemMessageValue);
    goBack();
    goBack();
  };

  return {
    isDirty,
    systemMessageValue,
    isChangedSystemMessage,
    resetSystemMessage,
    updateSystemMessage,
    onSubmit,
  };
}

export default useChatSettings;
