import React, { FC, useState } from "react";
import { IconButton } from "@vkontakte/vkui";
import { Icon16CopyOutline, Icon16CheckCircle } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

import classes from "./components.module.css";

interface CopyButtonProps {
  textToCopy: string;
  style?: React.CSSProperties;
  onCopySuccess?: () => void;
  onCopyError?: (error: Error) => void;
  successDuration?: number;
  size?: number;
  disabled?: boolean;
}

export const CopyButton: FC<CopyButtonProps> = ({
  textToCopy,
  style,
  onCopySuccess,
  onCopyError,
  successDuration = 1500,
  size,
  disabled = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLElement>) => {
    // Предотвращаем всплытие и дефолтное поведение
    e.preventDefault();
    e.stopPropagation();
    
    if (isCopied || disabled) return;

    // Убираем фокус со всех input/textarea перед копированием
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      activeEl.blur();
    }

    try {
      // Пробуем сначала нативный API — он не вызывает клавиатуру
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback на VK Bridge
        await bridge.send("VKWebAppCopyText", { text: textToCopy });
      }

      setIsCopied(true);
      onCopySuccess?.();

      setTimeout(() => setIsCopied(false), successDuration);
    } catch (error) {
      // Если нативный API не сработал, пробуем VK Bridge
      try {
        await bridge.send("VKWebAppCopyText", { text: textToCopy });
        setIsCopied(true);
        onCopySuccess?.();
        setTimeout(() => setIsCopied(false), successDuration);
      } catch (bridgeError) {
        onCopyError?.(bridgeError as Error);
      }
    }

    // Убираем фокус с любого активного элемента после копирования
    // Используем setTimeout чтобы дать браузеру время обработать событие
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 0);
  };

  const disabledStyles: React.CSSProperties = disabled
    ? {
        opacity: 0.4,
        cursor: "not-allowed",
      }
    : {};

  const buttonStyle: React.CSSProperties = {
    borderRadius: "50%",
    ...style,
    ...disabledStyles,
  };

  const buttonClassName = `${classes.copyButton} ${
    isCopied ? classes.copied : ""
  }`;

  return (
    <IconButton
      className={buttonClassName}
      onClick={handleCopy}
      style={buttonStyle}
      disabled={disabled}
    >
      {isCopied ? (
        <Icon16CheckCircle
          color="var(--vkui--color_background_accent_themed)"
          width={size}
          height={size}
        />
      ) : (
        <Icon16CopyOutline
          color="var(--vkui--color_background_accent_themed)"
          width={size}
          height={size}
        />
      )}
    </IconButton>
  );
};
