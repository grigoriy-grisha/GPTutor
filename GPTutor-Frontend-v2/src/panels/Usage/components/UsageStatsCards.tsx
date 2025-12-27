import { FC } from "react";
import { Div, Flex, Card, Caption, Title } from "@vkontakte/vkui";
import { UsageStats } from "../../../api/usageApi";
import { formatCost, formatTokens } from "../utils/usageFormatters";

interface UsageStatsCardsProps {
  stats: UsageStats | null;
}

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: FC<StatCardProps> = ({ label, value }) => (
  <Card mode="shadow" style={{ flex: 1, minWidth: 140 }}>
    <Div>
      <Caption
        level="1"
        style={{ color: "var(--vkui--color_text_secondary)" }}
      >
        {label}
      </Caption>
      <Title level="2">{value}</Title>
    </Div>
  </Card>
);

export const UsageStatsCards: FC<UsageStatsCardsProps> = ({ stats }) => {
  return (
    <Div>
      <Flex gap={12} style={{ flexWrap: "wrap" }}>
        <StatCard
          label="Всего потрачено"
          value={stats ? formatCost(stats.totalCost) : "0 ₽"}
        />
        <StatCard
          label="Всего токенов"
          value={stats ? formatTokens(stats.totalTokens) : "0"}
        />
        <StatCard
          label="Запросов"
          value={stats?.totalRequests ?? 0}
        />
      </Flex>
    </Div>
  );
};




