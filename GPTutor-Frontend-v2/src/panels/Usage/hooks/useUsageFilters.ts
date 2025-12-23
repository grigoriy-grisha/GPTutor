import { useState, useCallback } from "react";
import { getDefaultStartDate, getDefaultEndDate } from "../utils/usageFormatters";

export interface UseUsageFiltersReturn {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  filtersPopoverShown: boolean;
  setFiltersPopoverShown: (shown: boolean) => void;
  clearModelFilter: () => void;
  hasModelFilter: boolean;
}

export const useUsageFilters = (): UseUsageFiltersReturn => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(getDefaultStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(getDefaultEndDate);
  const [filtersPopoverShown, setFiltersPopoverShown] = useState(false);

  const clearModelFilter = useCallback(() => {
    setSelectedModel("");
  }, []);

  const hasModelFilter = !!selectedModel;

  return {
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
  };
};


