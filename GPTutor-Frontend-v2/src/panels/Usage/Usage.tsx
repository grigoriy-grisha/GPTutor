import { FC } from "react";
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Group, SimpleCell } from "@vkontakte/vkui";
import { Icon24CommentAddBadgeOutline, Icon24ExternalLinkOutline } from "@vkontakte/icons";
import { useRouteNavigator, useFirstPageCheck } from "@vkontakte/vk-mini-apps-router";
import { observer } from "mobx-react-lite";

import { useUsageFilters, useUsageData } from "./hooks";
import { UsageStatsCards, UsageFilters, UsageList } from "./components";

export interface UsageProps extends NavIdProps {}

export const Usage: FC<UsageProps> = observer(({ id }) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();

  // Фильтры
  const {
    selectedModel,
    setSelectedModel,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filtersPopoverShown,
    setFiltersPopoverShown,
    clearModelFilter,
    hasModelFilter,
  } = useUsageFilters();

  // Данные
  const {
    usages,
    stats,
    models,
    loading,
    loadingMore,
    error,
    loadUsages,
    loadMoreRef,
  } = useUsageData({
    selectedModel,
    startDate,
    endDate,
  });

  const handleBack = () => {
    if (isFirstPage) {
      routeNavigator.replace("/");
    } else {
      routeNavigator.back();
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={handleBack} />}>
        История использования
      </PanelHeader>

      {/* Статистика */}
      <Group>
        <UsageStatsCards stats={stats} />
      </Group>

      <Group>
        <SimpleCell
          before={<Icon24CommentAddBadgeOutline width={28} height={28} />}
          after={<Icon24ExternalLinkOutline />}
          subtitle="Напишите нам — предложим индивидуальные условия!"
          href="https://vk.com/gigarouter"
          target="_blank"
        >
          Хотите оптимизировать расходы?
        </SimpleCell>
      </Group>
      
      {/* Фильтры и история */}
      <Group>
        <UsageFilters
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
          models={models}
          filtersPopoverShown={filtersPopoverShown}
          onFiltersPopoverChange={setFiltersPopoverShown}
          hasModelFilter={hasModelFilter}
          onClearModelFilter={clearModelFilter}
        />

        <UsageList
          usages={usages}
          loading={loading}
          loadingMore={loadingMore}
          error={error}
          onRetry={() => loadUsages()}
          loadMoreRef={loadMoreRef}
        />
      </Group>

      
    </Panel>
  );
});
