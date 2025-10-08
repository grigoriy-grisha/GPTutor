import { useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Button } from "@vkontakte/vkui";
import { Icon16CopyOutline } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

export const useCodeCopyButtons = (isTyping: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderCopyButton = (code: string, blockId: string) => {
    return renderToString(
      <div
        style={{
          display: "flex",
          marginTop: "4px",
          marginBottom: "8px",
        }}
      >
        <Button
          size="s"
          mode="outline"
          before={<Icon16CopyOutline />}
          data-code={encodeURIComponent(code)}
          data-block-id={blockId}
          className="code-copy-button"
          style={{
            marginTop: "12px",
            fontSize: "12px",
            padding: "4px 8px",
            minHeight: "24px",
          }}
        >
          Копировать код
        </Button>
      </div>
    );
  };

  useEffect(() => {
    if (!containerRef.current || isTyping) return;

    const addCopyButtons = () => {
      const preElements = containerRef.current?.querySelectorAll("pre");
      if (!preElements) return;

      preElements.forEach((preElement, index) => {
        const existingButton =
          preElement.nextElementSibling?.classList.contains(
            "code-copy-button-container"
          );
        if (existingButton) return;

        const codeElement = preElement.querySelector("code");
        if (!codeElement) return;

        const cleanCode =
          codeElement.textContent || codeElement.innerText || "";
        const blockId = `code-block-${index}`;

        const buttonHtml = renderCopyButton(cleanCode, blockId);

        // Создаем временный контейнер для парсинга HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = buttonHtml;
        const buttonContainer = tempDiv.firstElementChild as HTMLElement;

        if (buttonContainer) {
          const copyButton = buttonContainer.querySelector(
            ".code-copy-button"
          ) as HTMLButtonElement;
          if (copyButton) {
            copyButton.addEventListener("click", async () => {
              try {
                const codeToCopy = decodeURIComponent(
                  copyButton.getAttribute("data-code") || ""
                );
                await bridge.send("VKWebAppCopyText", { text: codeToCopy });
              } catch (error) {
                console.error("Failed to copy code:", error);
              }
            });
          }

          preElement.parentNode?.insertBefore(
            buttonContainer,
            preElement.nextSibling
          );
        }
      });
    };

    const timer = setTimeout(addCopyButtons, 500);

    return () => clearTimeout(timer);
  }, [isTyping]);

  return containerRef;
};
