import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Title,
  Spinner,
  Placeholder,
  FormItem,
  DateInput,
  Flex,
  Button,
  Card,
  Text,
  Caption,
  SimpleCell,
  Popover,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import { useRouteNavigator, useFirstPageCheck } from "@vkontakte/vk-mini-apps-router";
import {
  Icon28MoneyHistoryBackwardOutline,
  Icon20ClockOutline,
  Icon20ArticleBoxOutline,
  Icon24Filter,
  Icon24CheckCircleOn,
} from "@vkontakte/icons";
import {
  usageApi,
  Usage as UsageType,
  UsageFilters,
  UsageStats,
} from "../../api/usageApi";
import { ModelIconService } from "../../services/ModelIconService";
import { observer } from "mobx-react-lite";

export interface UsageProps extends NavIdProps {}

export const Usage: FC<UsageProps> = observer(({ id }) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  const [usages, setUsages] = useState<UsageType[]>([]);
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Фильтры - по умолчанию последняя неделя
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  });
  const [filtersPopoverShown, setFiltersPopoverShown] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadUsages = useCallback(
    async (isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(null);
        }

        const filters: UsageFilters = {};
        if (selectedModel) filters.model = selectedModel;
        if (startDate) filters.startDate = startDate.toISOString();
        if (endDate) filters.endDate = endDate.toISOString();

        const response = await usageApi.getUsages(
          filters,
          isLoadMore ? cursor || undefined : undefined,
          20
        );

        if (isLoadMore) {
          setUsages((prev) => [...prev, ...response.usages]);
        } else {
          setUsages(response.usages);
        }

        setHasMore(response.hasMore);
        setCursor(response.nextCursor);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [cursor, selectedModel, startDate, endDate]
  );

  const loadStats = useCallback(async () => {
    try {
      const response = await usageApi.getStats();
      setStats(response.stats);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  const loadModels = useCallback(async () => {
    try {
      const response = await usageApi.getModels();
      setModels(response.models);
    } catch (err) {
      console.error("Failed to load models:", err);
    }
  }, []);

  useEffect(() => {
    loadUsages();
    loadStats();
    loadModels();
  }, []);

  // Перезагрузка при изменении фильтров
  useEffect(() => {
    setCursor(null);
    loadUsages(false);
  }, [selectedModel, startDate, endDate]);

  // Бесконечный скролл
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadUsages(true);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loading, loadUsages]);

  const clearModelFilter = () => {
    setSelectedModel("");
  };

  const hasModelFilter = !!selectedModel;

  // Получаем имя модели без провайдера
  const getModelName = (fullModelId: string) => {
    const parts = fullModelId.split("/");
    return parts[parts.length - 1];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCost = (cost: number) => {
    return cost.toFixed(6) + " ₽";
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + "M";
    }
    if (tokens >= 1000) {
      return (tokens / 1000).toFixed(1) + "K";
    }
    return tokens.toString();
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              if (isFirstPage) {
                routeNavigator.replace("/");
              } else {
                routeNavigator.back();
              }
            }}
          />
        }
      >
        История использования
      </PanelHeader>

      {/* Статистика */}
      <Group>
        <Div>
          <Flex gap={12} style={{ flexWrap: "wrap" }}>
            <Card mode="shadow" style={{ flex: 1, minWidth: 140 }}>
              <Div>
                <Caption
                  level="1"
                  style={{ color: "var(--vkui--color_text_secondary)" }}
                >
                  Всего потрачено
                </Caption>
                <Title level="2">
                  {stats ? formatCost(stats.totalCost) : "0 ₽"}
                </Title>
              </Div>
            </Card>
            <Card mode="shadow" style={{ flex: 1, minWidth: 140 }}>
              <Div>
                <Caption
                  level="1"
                  style={{ color: "var(--vkui--color_text_secondary)" }}
                >
                  Всего токенов
                </Caption>
                <Title level="2">
                  {stats ? formatTokens(stats.totalTokens) : "0"}
                </Title>
              </Div>
            </Card>
            <Card mode="shadow" style={{ flex: 1, minWidth: 140 }}>
              <Div>
                <Caption
                  level="1"
                  style={{ color: "var(--vkui--color_text_secondary)" }}
                >
                  Запросов
                </Caption>
                <Title level="2">{stats?.totalRequests ?? 0}</Title>
              </Div>
            </Card>
          </Flex>
        </Div>
      </Group>

      {/* Фильтры и история */}
      <Group>
        {/* Фильтры */}
        <Div style={{ paddingBottom: 0 }}>
          <Flex
            direction={isDesktop ? "row" : "column"}
            gap={isDesktop ? 12 : 12}
            align={isDesktop ? "center" : "stretch"}
            justify="space-between"
          >
            {/* Левая часть: даты */}
            <Flex
              gap={isDesktop ? 12 : 12}
              align="center"
              style={{
                width: isDesktop ? "auto" : "100%",
              }}
              direction="row"
            >
              <FormItem
                style={{
                  margin: 0,
                  padding: 0,
                  flex: 1,
                }}
              >
                <DateInput value={startDate} onChange={setStartDate} enableTime />
              </FormItem>
              {isDesktop && (
                <Text style={{ color: "var(--vkui--color_text_secondary)", flexShrink: 0 }}>
                  —
                </Text>
              )}
              <FormItem
                style={{
                  margin: 0,
                  padding: 0,
                  flex: 1,
                }}
              >
                <DateInput value={endDate} onChange={setEndDate} enableTime />
              </FormItem>
            </Flex>

            {/* Правая часть: кнопка Filters */}
            <div style={{ width: isDesktop ? "auto" : "100%" }}>
            <Popover
              trigger="click"
              shown={filtersPopoverShown}
              onShownChange={setFiltersPopoverShown}
              placement="bottom-end"
              content={
                <div style={{ padding: 8, minWidth: 280 }}>
                  <Caption
                    level="1"
                    weight="2"
                    style={{
                      color: "var(--vkui--color_text_secondary)",
                      padding: "8px 12px 4px",
                    }}
                  >
                    Модель
                  </Caption>
                  <SimpleCell
                    onClick={() => {
                      clearModelFilter();
                      setFiltersPopoverShown(false);
                    }}
                    after={
                      !selectedModel ? (
                        <Icon24CheckCircleOn
                          style={{ color: "var(--vkui--color_icon_accent)" }}
                        />
                      ) : undefined
                    }
                    style={{ borderRadius: 8 }}
                  >
                    Все модели
                  </SimpleCell>
                  {models.map((model) => (
                    <SimpleCell
                      key={model}
                      before={
                        <div style={ModelIconService.getIconContainerStyle()}>
                          {ModelIconService.getModelIcon(model)}
                        </div>
                      }
                      after={
                        selectedModel === model ? (
                          <Icon24CheckCircleOn
                            style={{ color: "var(--vkui--color_icon_accent)" }}
                          />
                        ) : undefined
                      }
                      onClick={() => {
                        setSelectedModel(model);
                        setFiltersPopoverShown(false);
                      }}
                      style={{ borderRadius: 8 }}
                    >
                      {getModelName(model)}
                    </SimpleCell>
                  ))}
                </div>
              }
            >
              <Button
                mode={hasModelFilter ? "primary" : "secondary"}
                size="m"
                before={<Icon24Filter />}
                style={{
                  width: isDesktop ? "auto" : "100%",
                }}
              >
                Фильтры{hasModelFilter ? ` (1)` : ""}
              </Button>
            </Popover>
            </div>
          </Flex>
        </Div>

        {/* Список usage */}
        {loading ? (
          <Flex justify="center" style={{ padding: 40 }}>
            <Spinner size="m" />
          </Flex>
        ) : error ? (
          <Placeholder
            icon={<Icon28MoneyHistoryBackwardOutline />}
            action={
              <Button mode="secondary" onClick={() => loadUsages()}>
                Повторить
              </Button>
            }
          >
            {error}
          </Placeholder>
        ) : usages.length === 0 ? (
          <Placeholder icon={<Icon28MoneyHistoryBackwardOutline />}>
            <Title level="2" style={{ marginBottom: 8 }}>
              История использования пуста
            </Title>
            <Text style={{ color: "var(--vkui--color_text_secondary)" }}>
              Здесь будет отображаться статистика ваших запросов к AI-моделям
            </Text>
          </Placeholder>
        ) : (
          <Div style={{ paddingTop: 24 }}>
            <Flex direction="column" gap={8}>
              {usages.map((usage) => (
                <Card
                  key={usage.id}
                  mode="outline"
                  style={{
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <div
                    style={{ padding: isDesktop ? "14px 16px" : "12px 14px" }}
                  >
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
                      gap={12}
                    >
                      {/* Левая часть: иконка + инфо */}
                      <Flex
                        align="center"
                        gap={12}
                        style={{ flex: 1, minWidth: 0 }}
                      >
                        <div
                          style={{
                            ...ModelIconService.getIconContainerStyle(),
                            flexShrink: 0,
                          }}
                        >
                          {ModelIconService.getModelIcon(usage.model)}
                        </div>

                        <Flex
                          direction="column"
                          gap={2}
                          style={{ flex: 1, minWidth: 0 }}
                        >
                          <Flex align="center" gap={6}>
                            <Text
                              weight="2"
                              style={{
                                fontSize: isDesktop ? "15px" : "14px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {getModelName(usage.model)}
                            </Text>
                            {usage.aborted && (
                              <Caption
                                level="2"
                                style={{
                                  color: "var(--vkui--color_text_secondary)",
                                  background:
                                    "var(--vkui--color_background_secondary)",
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
                                style={{
                                  color: "var(--vkui--color_icon_secondary)",
                                }}
                              />
                              <Caption
                                level="1"
                                style={{
                                  color: "var(--vkui--color_text_secondary)",
                                }}
                              >
                                {formatDate(usage.createdAt)}
                              </Caption>
                            </Flex>
                            <Flex align="center" gap={3}>
                              <Icon20ArticleBoxOutline
                                width={14}
                                height={14}
                                style={{
                                  color: "var(--vkui--color_icon_secondary)",
                                }}
                              />
                              <Caption
                                level="1"
                                style={{
                                  color: "var(--vkui--color_text_secondary)",
                                }}
                              >
                                {formatTokens(usage.promptTokens)} →{" "}
                                {formatTokens(usage.completionTokens)}
                              </Caption>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>

                      {/* Правая часть: стоимость */}
                      <Flex
                        direction="column"
                        align="end"
                        style={{ flexShrink: 0 }}
                      >
                        <Text
                          weight="2"
                          style={{ fontSize: isDesktop ? "15px" : "14px" }}
                        >
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
        )}
      </Group>
    </Panel>
  );
});
