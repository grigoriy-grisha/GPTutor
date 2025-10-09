import { FC } from "react";
import {
  Button,
  Div,
  Flex,
  Group,
  SegmentedControl,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import { Icon28CopyOutline, Icon28LinkOutline } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

import {
  CodeExampleService,
  CodeExampleType,
} from "../../services/CodeExampleService";
import { getCodeStyles } from "../../utils/codeFormatter";
import { useSnackbar } from "../../hooks";

interface CodeExamplesSectionProps {
  apiKey: string;
  activeCodeExample: CodeExampleType;
  onCodeExampleChange: (type: CodeExampleType) => void;
}

export const CodeExamplesSection: FC<CodeExamplesSectionProps> = ({
  apiKey,
  activeCodeExample,
  onCodeExampleChange,
}) => {
  const codeHTML = CodeExampleService.getCodeHTML(activeCodeExample, apiKey);
  const rawCode = CodeExampleService.getRawCode(activeCodeExample, apiKey);
  const { showInfo } = useSnackbar();

  const handleCopyCode = async () => {
    await bridge.send("VKWebAppCopyText", { text: rawCode });

    showInfo("Код скопирован");
  };

  return (
    <Group>
      <Div>
        <Title level="3">Примеры использования</Title>
        <Spacing size={12} />
        <SegmentedControl
          value={activeCodeExample}
          onChange={(value) => onCodeExampleChange(value as CodeExampleType)}
          options={[
            {
              label: "Curl",
              value: "curl",
            },
            {
              label: "Python",
              value: "python",
            },
            {
              label: "JavaScript",
              value: "js",
            },
          ]}
        />
        <Spacing size={16} />
        <div
          className="code-block"
          style={{
            overflow: "auto",
          }}
          dangerouslySetInnerHTML={{ __html: codeHTML }}
        />

        <style>{getCodeStyles()}</style>

        <Spacing size={16} />

        <Flex align="center" gap={12} style={{ flexWrap: "nowrap" }}>
          <Button
            size="m"
            mode="outline"
            onClick={handleCopyCode}
            after={<Icon28CopyOutline />}
            style={{ width: "100%" }}
          >
            Копировать код
          </Button>
          <Button
            target="_blank"
            href="https://docs.giga-router.ru/"
            size="m"
            mode="outline"
            after={<Icon28LinkOutline />}
            style={{ width: "100%" }}
          >
            Документация
          </Button>
        </Flex>
      </Div>
    </Group>
  );
};
