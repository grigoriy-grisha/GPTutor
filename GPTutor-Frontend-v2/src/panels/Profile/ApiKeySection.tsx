import { FC } from "react";
import {
  Button,
  Div,
  Flex,
  Group,
  IconButton,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import {
  Icon28CopyOutline,
  Icon28RefreshOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { createCodeHTML } from "../../utils/codeFormatter";

interface ApiKeySectionProps {
  apiKey: string;
  updatingToken: boolean;
  onUpdateToken: () => void;
}

export const ApiKeySection: FC<ApiKeySectionProps> = ({
  apiKey,
  updatingToken,
  onUpdateToken,
}) => {
  const handleCopyApiKey = () => {
    bridge.send("VKWebAppCopyText", {
      text: apiKey,
    });
  };

  return (
    <Group>
      <Div>
        <Title level="3">API Ключ</Title>
        <Spacing size={12} />
        <Flex
          align="center"
          style={{ flexWrap: "nowrap" }}
          wrap="nowrap"
          gap={6}
        >
          <div
            style={{ width: "100%", fontWeight: 700 }}
            className="code-block"
            dangerouslySetInnerHTML={{
              __html: createCodeHTML(apiKey, "python"),
            }}
          />
          <IconButton onClick={handleCopyApiKey}>
            <Icon28CopyOutline
              color="var(--vkui--color_background_accent_themed)"
              width={24}
              height={24}
            />
          </IconButton>
        </Flex>
        <Spacing size={16} />
        <Button
          style={{ width: "100%" }}
          size="m"
          align="center"
          mode="outline"
          after={<Icon28RefreshOutline width={24} height={24} />}
          loading={updatingToken}
          onClick={onUpdateToken}
        >
          Перегенерировать
        </Button>
      </Div>
    </Group>
  );
};


