import React, { memo } from "react";

import { Alert } from "@vkontakte/vkui";

import { InPortal } from "$/components/InPortal";

interface IProps {
  applySettings: () => void;
  closeAlert: () => void;
}

function ApplyAlert({ applySettings, closeAlert }: IProps) {
  return (
    <InPortal id="root">
      <Alert
        actions={[
          {
            title: "Применить настройки",
            mode: "destructive",
            action: applySettings,
          },
          { title: "Вернуться", mode: "cancel" },
        ]}
        actionsLayout="vertical"
        onClose={closeAlert}
        header="Подтвердите действие"
        text="После изменения системных настроек история сообщений будет отчищена!"
      />
    </InPortal>
  );
}

export default memo(ApplyAlert);
