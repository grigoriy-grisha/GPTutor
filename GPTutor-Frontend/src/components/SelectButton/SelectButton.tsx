import React from "react";

import { Button } from "@vkontakte/vkui";
import { Icon24AddOutline, Icon24DoneOutline } from "@vkontakte/icons";

interface IProps {
  selected: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  selectedMode?: "primary" | "outline" | "secondary" | "tertiary";
  defaultMode?: "primary" | "outline" | "secondary" | "tertiary";
}

function SelectButton({
  selected,
  children,
  onClick,
  selectedMode,
  defaultMode,
  className,
}: IProps) {
  return (
    <Button
      className={className}
      onClick={onClick}
      mode={selected ? selectedMode || "primary" : defaultMode || "outline"}
      size="m"
      after={
        selected ? (
          <Icon24DoneOutline width={20} height={20} />
        ) : (
          <Icon24AddOutline width={20} height={20} />
        )
      }
    >
      {children}
    </Button>
  );
}

export default SelectButton;
