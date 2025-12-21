import { FC, useState } from "react";
import { Button } from "@vkontakte/vkui";
import { Icon28CopyOutline } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

interface CopyProps {
  copyText: string;
  textToClickBoard: string;
  mode?: "primary" | "secondary" | "tertiary" | "outline" | "link";
  isButton?: boolean;
}

export const Copy: FC<CopyProps> = ({ 
  copyText, 
  textToClickBoard, 
  mode = "secondary", 
  isButton = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Пробуем сначала нативный API — он не вызывает клавиатуру
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToClickBoard);
      } else {
        await bridge.send("VKWebAppCopyText", { text: textToClickBoard });
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback на VK Bridge если нативный API не сработал
      try {
        await bridge.send("VKWebAppCopyText", { text: textToClickBoard });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (bridgeErr) {
        console.error('Failed to copy text: ', bridgeErr);
      }
    }

    // Убираем фокус чтобы не триггерить клавиатуру
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  if (isButton) {
    return (
      <Button
        size="s"
        mode={mode}
        before={<Icon28CopyOutline />}
        onClick={handleCopy}
      >
        {copied ? 'Скопировано!' : copyText}
      </Button>
    );
  }

  return (
    <div onClick={handleCopy} style={{ cursor: 'pointer' }}>
      {copied ? 'Скопировано!' : copyText}
    </div>
  );
};






