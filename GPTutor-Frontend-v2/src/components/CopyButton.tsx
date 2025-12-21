import React, { FC, useState, useCallback } from "react";
import { IconButton } from "@vkontakte/vkui";
import { Icon16CopyOutline, Icon16CheckCircle } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

import classes from "./components.module.css";

/**
 * Копирует текст без показа клавиатуры на мобильных устройствах
 */
const copyTextSilently = async (text: string): Promise<boolean> => {
  // 1. Пробуем современный Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Продолжаем к следующему методу
    }
  }

  // 2. Fallback через невидимый textarea с readonly (не показывает клавиатуру)
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    
    // Делаем textarea невидимым и readonly
    textarea.setAttribute("readonly", "");
    textarea.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 1px;
      height: 1px;
      padding: 0;
      border: none;
      outline: none;
      opacity: 0;
      pointer-events: none;
    `;
    
    document.body.appendChild(textarea);
    
    // Сохраняем текущий активный элемент
    const activeElement = document.activeElement as HTMLElement;
    
    // Выделяем текст
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    // Копируем
    const success = document.execCommand("copy");
    
    // Удаляем textarea
    document.body.removeChild(textarea);
    
    // Восстанавливаем фокус или убираем его
    if (activeElement && activeElement !== document.body) {
      // Если был активен input — не возвращаем на него фокус
      if (activeElement.tagName !== "INPUT" && activeElement.tagName !== "TEXTAREA") {
        activeElement.focus();
      }
    }
    
    if (success) return true;
  } catch {
    // Продолжаем к VK Bridge
  }

  // 3. Последний fallback — VK Bridge (может показать клавиатуру)
  try {
    await bridge.send("VKWebAppCopyText", { text });
    return true;
  } catch {
    return false;
  }
};

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

  const handleCopy = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCopied || disabled) return;

    // Убираем фокус со всех input/textarea перед копированием
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const success = await copyTextSilently(textToCopy);

    if (success) {
      setIsCopied(true);
      onCopySuccess?.();
      setTimeout(() => setIsCopied(false), successDuration);
    } else {
      onCopyError?.(new Error("Failed to copy text"));
    }

    // Гарантируем что фокус убран после всех операций
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, [isCopied, disabled, textToCopy, onCopySuccess, onCopyError, successDuration]);

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
