import React, { FC, useState } from "react";
import { IconButton } from "@vkontakte/vkui";
import { Icon16CopyOutline, Icon16CheckCircle } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

import classes from "./components.module.css";

interface CopyButtonProps {
  /** Текст для копирования */
  textToCopy: string;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** Колбэк при успешном копировании */
  onCopySuccess?: () => void;
  /** Колбэк при ошибке копирования */
  onCopyError?: (error: Error) => void;
  /** Длительность показа галочки в миллисекундах */
  successDuration?: number;
}

export const CopyButton: FC<CopyButtonProps> = ({
  textToCopy,
  style,
  onCopySuccess,
  onCopyError,
  successDuration = 1500,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) return;

    try {
      await bridge.send("VKWebAppCopyText", { text: textToCopy });

      console.log("CopyButton: Copy successful, setting isCopied to true");
      setIsCopied(true);
      onCopySuccess?.();

      setTimeout(() => setIsCopied(false), successDuration);
    } catch (error) {
      console.error("CopyButton: Failed to copy text:", error);
      onCopyError?.(error as Error);
    }
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: "50%",
    ...style,
  };

  const buttonClassName = `${classes.copyButton} ${isCopied ? classes.copied : ''}`;

  return (
    <IconButton
      className={buttonClassName}
      onClick={handleCopy}
      style={buttonStyle}
    >
      {isCopied ? <Icon16CheckCircle /> : <Icon16CopyOutline />}
    </IconButton>
  );
};
