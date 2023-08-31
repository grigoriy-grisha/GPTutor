import React from "react";
import { Icon28DeleteClockOutline } from "@vkontakte/icons";
import { IconButton } from "@vkontakte/vkui";

import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";

function HistoryDelete() {
  const { openAlert, goBack } = useNavigationContext();

  const dialogs = chatGpt.history.dialogs.get();
  const loading = chatGpt.history.deleteAllHistory$.loading.get();

  return (
    <>
      <IconButton
        disabled={dialogs.length === 0 || loading}
        onClick={() =>
          openAlert({
            onAction: async () => {
              await chatGpt.history.removeAllHistories();
              goBack();
            },
            actionText: "Удалить всю историю",
            header: "Подтвердите действие",
            text: "Вы уверены? Диалоги нельзя будет вернуть!",
          })
        }
      >
        <Icon28DeleteClockOutline fill="var(--vkui--color_background_negative)" />
      </IconButton>
    </>
  );
}

export default HistoryDelete;
