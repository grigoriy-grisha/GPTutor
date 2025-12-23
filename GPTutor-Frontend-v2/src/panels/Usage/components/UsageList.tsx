import { FC, RefObject } from "react";
import { Div, Flex, Spinner, Placeholder, Title, Text, Button } from "@vkontakte/vkui";
import { Icon28MoneyHistoryBackwardOutline } from "@vkontakte/icons";
import { Usage } from "../../../api/usageApi";
import { UsageCard } from "./UsageCard";

interface UsageListProps {
  usages: Usage[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  onRetry: () => void;
  loadMoreRef: RefObject<HTMLDivElement>;
}

export const UsageList: FC<UsageListProps> = ({
  usages,
  loading,
  loadingMore,
  error,
  onRetry,
  loadMoreRef,
}) => {
  if (loading) {
    return (
      <Flex justify="center" style={{ padding: 40 }}>
        <Spinner size="m" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Placeholder
        icon={<Icon28MoneyHistoryBackwardOutline />}
        action={
          <Button mode="secondary" onClick={onRetry}>
            Повторить
          </Button>
        }
      >
        {error}
      </Placeholder>
    );
  }

  if (usages.length === 0) {
    return (
      <Placeholder icon={<Icon28MoneyHistoryBackwardOutline />}>
        <Title level="2" style={{ marginBottom: 8 }}>
          История использования пуста
        </Title>
        <Text style={{ color: "var(--vkui--color_text_secondary)" }}>
          Здесь будет отображаться статистика ваших запросов к AI-моделям
        </Text>
      </Placeholder>
    );
  }

  return (
    <Div style={{ paddingTop: 24 }}>
      <Flex direction="column" gap={8}>
        {usages.map((usage) => (
          <UsageCard key={usage.id} usage={usage} />
        ))}
      </Flex>

      {/* Элемент для бесконечного скролла */}
      <div ref={loadMoreRef} style={{ height: 20, marginTop: 8 }} />

      {loadingMore && (
        <Flex justify="center" style={{ padding: 16 }}>
          <Spinner size="s" />
        </Flex>
      )}
    </Div>
  );
};


