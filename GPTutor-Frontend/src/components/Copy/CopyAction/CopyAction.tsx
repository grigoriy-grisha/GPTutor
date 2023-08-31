import React from "react";

import { Icon20CopyOutline, Icon24CopyOutline } from "@vkontakte/icons";
import { Button, IconButton } from "@vkontakte/vkui";

interface IProps {
  mode?: "primary" | "secondary" | "tertiary" | "outline" | "link";
  copyText?: string;
  isButton?: boolean;
  className?: string;
  onClick: () => void;
}

function CopyAction({ mode, isButton, copyText, className, onClick }: IProps) {
  if (isButton) {
    return (
      <Button
        mode={mode}
        size="m"
        before={<Icon20CopyOutline />}
        onClick={onClick}
      >
        {copyText || "Скопировать"}
      </Button>
    );
  }

  return (
    <IconButton className={className} onClick={onClick}>
      <Icon24CopyOutline />
    </IconButton>
  );
}

export default CopyAction;
