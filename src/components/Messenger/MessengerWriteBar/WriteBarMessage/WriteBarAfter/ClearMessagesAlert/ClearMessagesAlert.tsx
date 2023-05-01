import React from "react";
import { Alert } from "@vkontakte/vkui";

import { InPortal } from "$/components/InPortal";

interface IProps {
  applySettings: () => void;
  closeAlert: () => void;
}

function ClearMessagesAlert({ applySettings, closeAlert }: IProps) {
  return (
    <InPortal id="root">
      <Alert
        actions={[
          {
            title: "Удалить сообщения",
            mode: "destructive",
            action: applySettings,
          },
          { title: "Вернуться", mode: "cancel", action: closeAlert },
        ]}
        actionsLayout="vertical"
        onClose={closeAlert}
        header="Подтвердите действие"
        text="Вы уверены? Историю сообщений нельзя будет вернуть!"
      />
    </InPortal>
  );
}

export default ClearMessagesAlert;
