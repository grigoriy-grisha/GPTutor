import { useState, useCallback, useEffect, useRef } from "react";
import { usageApi, Usage, UsageFilters, UsageStats } from "../../../api/usageApi";

export interface UseUsageDataParams {
  selectedModel: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface UseUsageDataReturn {
  usages: Usage[];
  stats: UsageStats | null;
  models: string[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadUsages: (isLoadMore?: boolean) => Promise<void>;
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

export const useUsageData = ({
  selectedModel,
  startDate,
  endDate,
}: UseUsageDataParams): UseUsageDataReturn => {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // Начальная загрузка
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

  return {
    usages,
    stats,
    models,
    loading,
    loadingMore,
    error,
    hasMore,
    loadUsages,
    loadMoreRef,
  };
};

