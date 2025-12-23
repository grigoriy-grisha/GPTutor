import { FC } from "react";
import {
  Card,
  Flex,
  Text,
  Caption,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import { Icon20ClockOutline, Icon20ArticleBoxOutline } from "@vkontakte/icons";
import { Usage } from "../../../api/usageApi";
import { ModelIconService } from "../../../services/ModelIconService";
import {
  getModelName,
  formatDate,
  formatCost,
  formatTokens,
} from "../utils/usageFormatters";

interface UsageCardProps {
  usage: Usage;
}

export const UsageCard: FC<UsageCardProps> = ({ usage }) => {
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  return (
    <Card mode="outline" style={{ transition: "background-color 0.15s ease" }}>
      <div style={{ padding: isDesktop ? "14px 16px" : "12px 14px" }}>
        <Flex direction="row" align="center" justify="space-between" gap={12}>
          {/* Левая часть: иконка + инфо */}
          <Flex align="center" gap={12} style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                ...ModelIconService.getIconContainerStyle(),
                flexShrink: 0,
              }}
            >
              {ModelIconService.getModelIcon(usage.model)}
            </div>

            <Flex direction="column" gap={2} style={{ flex: 1, minWidth: 0 }}>
              <Flex align="center" gap={6}>
                <Text
                  weight="2"
                  style={{
                    fontSize: isDesktop ? "15px" : "14px",
                  }}
                >
                  {getModelName(usage.model)}
                </Text>
                {usage.aborted && (
                  <Caption
                    level="2"
                    style={{
                      color: "var(--vkui--color_text_secondary)",
                      background: "var(--vkui--color_background_secondary)",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    Прервано
                  </Caption>
                )}
              </Flex>

              <Flex
                align="center"
                gap={isDesktop ? 12 : 8}
                style={{ flexWrap: "wrap" }}
              >
                <Flex align="center" gap={3}>
                  <Icon20ClockOutline
                    width={14}
                    height={14}
                    style={{ color: "var(--vkui--color_icon_secondary)" }}
                  />
                  <Caption
                    level="1"
                    style={{ color: "var(--vkui--color_text_secondary)" }}
                  >
                    {formatDate(usage.createdAt)}
                  </Caption>
                </Flex>
                <Flex align="center" gap={3}>
                  <Icon20ArticleBoxOutline
                    width={14}
                    height={14}
                    style={{ color: "var(--vkui--color_icon_secondary)" }}
                  />
                  <Caption
                    level="1"
                    style={{ color: "var(--vkui--color_text_secondary)" }}
                  >
                    {formatTokens(usage.promptTokens)} →{" "}
                    {formatTokens(usage.completionTokens)}
                  </Caption>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* Правая часть: стоимость */}
          <Flex direction="column" align="end" style={{ flexShrink: 0 }}>
            <Text weight="2" style={{ fontSize: isDesktop ? "15px" : "14px" }}>
              {formatCost(usage.cost)}
            </Text>
            <Caption
              level="1"
              style={{ color: "var(--vkui--color_text_secondary)" }}
            >
              {formatTokens(usage.totalTokens)} токенов
            </Caption>
          </Flex>
        </Flex>
      </div>
    </Card>
  );
};
