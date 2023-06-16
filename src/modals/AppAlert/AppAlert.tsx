import React from "react";
import { Alert } from "@vkontakte/vkui";

import { useNavigationContext } from "$/NavigationContext";
import { useLocation } from "@happysanta/router";

interface IProps {
  id: string;
}

function AppAlert({ id }: IProps) {
  const location = useLocation();
  const { goBack, alert } = useNavigationContext();

  if (location.getPopupId() !== id) return null;

  return (
    <Alert
      id={id}
      actions={[
        {
          title: alert.actionText,
          mode: "destructive",
          action: alert.onAction,
        },
        { title: "Отмена", mode: "cancel", action: goBack },
      ]}
      actionsLayout="vertical"
      header={alert.header}
      text={alert.actionText}
      onClose={goBack}
    />
  );
}

export default AppAlert;
