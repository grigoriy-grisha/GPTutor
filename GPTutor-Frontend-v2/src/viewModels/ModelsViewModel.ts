import { useState, useCallback, useEffect } from "react";
import { ProcessedModel } from "../api";
import { ModelsService } from "../services/ModelsService";

export interface ModelsViewModelState {
  models: ProcessedModel[];
  filteredModels: ProcessedModel[];
  searchQuery: string;
  snackbar: React.ReactNode | null;
  sortOrder: "asc" | "desc";
  loading: boolean;
}

export const useModelsViewModel = () => {
  const [state, setState] = useState<ModelsViewModelState>({
    models: [],
    filteredModels: [],
    searchQuery: "",
    snackbar: null,
    sortOrder: "asc",
    loading: false,
  });

  const setSnackbar = useCallback((snackbar: React.ReactNode | null) => {
    setState(prev => ({ ...prev, snackbar }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setState(prev => ({ ...prev, searchQuery }));
  }, []);

  const setSortOrder = useCallback((sortOrder: "asc" | "desc") => {
    setState(prev => ({ ...prev, sortOrder }));
  }, []);

  const filterModels = useCallback((query: string) => {
    setState(prev => {
      const filtered = ModelsService.filterModels(prev.models, query, prev.sortOrder);
      return {
        ...prev,
        filteredModels: filtered,
      };
    });
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterModels(value);
  }, [filterModels, setSearchQuery]);

  const handleQuickSearch = useCallback((query: string) => {
    setSearchQuery(query);
    filterModels(query);
  }, [filterModels, setSearchQuery]);

  const handleSortToggle = useCallback(() => {
    const newOrder = state.sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  }, [state.sortOrder, setSortOrder]);

  const copyModelId = useCallback(async (modelId: string) => {
    const success = await ModelsService.copyModelId(modelId);
    
    if (success) {
      const successSnackbar = ModelsService.createSuccessSnackbar(
        `ID скопирован: ${modelId}`,
        () => setSnackbar(null)
      );
      setSnackbar(successSnackbar);
    } else {
      const errorSnackbar = ModelsService.createErrorSnackbar(
        "Не удалось скопировать",
        () => setSnackbar(null)
      );
      setSnackbar(errorSnackbar);
    }
  }, [setSnackbar]);

  const tryModel = useCallback((modelId: string) => {
    const trySnackbar = ModelsService.createTryModelSnackbar(
      modelId,
      () => setSnackbar(null)
    );
    setSnackbar(trySnackbar);
  }, [setSnackbar]);

  const loadModels = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const models = await ModelsService.fetchModels();
      setState(prev => ({
        ...prev,
        models,
        filteredModels: models,
        loading: false,
      }));
    } catch (error) {
      const errorSnackbar = ModelsService.createErrorSnackbar(
        `Ошибка загрузки моделей: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
        () => setSnackbar(null)
      );
      setState(prev => ({
        ...prev,
        loading: false,
        snackbar: errorSnackbar,
      }));
    }
  }, [setSnackbar]);

  // Effect to re-filter when sort order changes
  useEffect(() => {
    filterModels(state.searchQuery);
  }, [state.sortOrder, filterModels, state.searchQuery]);

  return {
    ...state,
    setSnackbar,
    handleSearchChange,
    handleQuickSearch,
    handleSortToggle,
    copyModelId,
    tryModel,
    loadModels,
  };
};

