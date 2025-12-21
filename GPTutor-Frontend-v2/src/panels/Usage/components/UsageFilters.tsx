import { FC } from "react";
import {
  Div,
  Flex,
  FormItem,
  DateInput,
  Button,
  Text,
  Caption,
  SimpleCell,
  Popover,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import { Icon24Filter, Icon24CheckCircleOn } from "@vkontakte/icons";
import { ModelIconService } from "../../../services/ModelIconService";
import { getModelName } from "../utils/usageFormatters";

interface UsageFiltersProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  selectedModel: string;
  onModelSelect: (model: string) => void;
  models: string[];
  filtersPopoverShown: boolean;
  onFiltersPopoverChange: (shown: boolean) => void;
  hasModelFilter: boolean;
  onClearModelFilter: () => void;
}

export const UsageFilters: FC<UsageFiltersProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  selectedModel,
  onModelSelect,
  models,
  filtersPopoverShown,
  onFiltersPopoverChange,
  hasModelFilter,
  onClearModelFilter,
}) => {
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  return (
    <Div style={{ paddingBottom: 0 }}>
      <Flex
        direction={isDesktop ? "row" : "column"}
        gap={12}
        align={isDesktop ? "center" : "stretch"}
        justify="space-between"
      >
        {/* Левая часть: даты */}
        <Flex
          gap={12}
          align="center"
          style={{ width: isDesktop ? "auto" : "100%" }}
          direction="row"
        >
          <FormItem style={{ margin: 0, padding: 0, flex: 1 }}>
            <DateInput
              value={startDate}
              onChange={onStartDateChange}
              enableTime
            />
          </FormItem>
          {isDesktop && (
            <Text
              style={{
                color: "var(--vkui--color_text_secondary)",
                flexShrink: 0,
              }}
            >
              —
            </Text>
          )}
          <FormItem style={{ margin: 0, padding: 0, flex: 1 }}>
            <DateInput value={endDate} onChange={onEndDateChange} enableTime />
          </FormItem>
        </Flex>

        {/* Правая часть: кнопка Filters */}
        <div style={{ width: isDesktop ? "auto" : "100%" }}>
          <Popover
            trigger="click"
            shown={filtersPopoverShown}
            onShownChange={onFiltersPopoverChange}
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
                    onClearModelFilter();
                    onFiltersPopoverChange(false);
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
                      onModelSelect(model);
                      onFiltersPopoverChange(false);
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
              style={{ width: isDesktop ? "auto" : "100%" }}
            >
              Фильтры{hasModelFilter ? " (1)" : ""}
            </Button>
          </Popover>
        </div>
      </Flex>
    </Div>
  );
};

