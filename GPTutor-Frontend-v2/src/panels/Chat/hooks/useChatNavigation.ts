import { useCallback } from "react";
import { useRouteNavigator, useFirstPageCheck } from "@vkontakte/vk-mini-apps-router";

interface UseChatNavigationReturn {
  handleBack: () => void;
  handleModelSelect: () => void;
}

/**
 * Хук для навигации в чате
 */
export const useChatNavigation = (): UseChatNavigationReturn => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();

  const handleBack = useCallback(() => {
    if (isFirstPage) {
      routeNavigator.replace("/");
    } else {
      routeNavigator.back();
    }
  }, [routeNavigator, isFirstPage]);

  const handleModelSelect = useCallback(() => {
    routeNavigator.push("/models");
  }, [routeNavigator]);

  return {
    handleBack,
    handleModelSelect,
  };
};




