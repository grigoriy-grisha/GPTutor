import { useState, useCallback } from "react";
import { UserProfile, VkData } from "../api/profileApi";
import { ProfileService } from "../services/ProfileService";
import { CodeExampleType } from "../services/CodeExampleService";

export interface ProfileViewModelState {
  profile: UserProfile | null;
  vkData: VkData | null;
  loading: boolean;
  updatingToken: boolean;
  snackbar: React.ReactNode | null;
  activeCodeExample: CodeExampleType;
}

export const useProfileViewModel = () => {
  const [state, setState] = useState<ProfileViewModelState>({
    profile: null,
    vkData: null,
    loading: true,
    updatingToken: false,
    snackbar: null,
    activeCodeExample: "curl",
  });

  const setSnackbar = useCallback((snackbar: React.ReactNode | null) => {
    setState(prev => ({ ...prev, snackbar }));
  }, []);

  const setActiveCodeExample = useCallback((activeCodeExample: CodeExampleType) => {
    setState(prev => ({ ...prev, activeCodeExample }));
  }, []);

  const loadProfile = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const { user, vkData } = await ProfileService.loadProfile();
      setState(prev => ({
        ...prev,
        profile: user,
        vkData,
        loading: false,
      }));
    } catch (error) {
      const errorSnackbar = ProfileService.createErrorSnackbar(
        "Ошибка загрузки профиля",
        () => setSnackbar(null)
      );
      setState(prev => ({
        ...prev,
        loading: false,
        snackbar: errorSnackbar,
      }));
    }
  }, []);

  const updateToken = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, updatingToken: true }));
      const newApiKey = await ProfileService.updateApiToken();
      
      setState(prev => ({
        ...prev,
        profile: prev.profile ? { ...prev.profile, apiKey: newApiKey } : null,
        updatingToken: false,
      }));

      const successSnackbar = ProfileService.createSuccessSnackbar(
        "API ключ успешно обновлен",
        () => setSnackbar(null)
      );
      setSnackbar(successSnackbar);
    } catch (error) {
      const errorSnackbar = ProfileService.createErrorSnackbar(
        "Ошибка обновления ключа",
        () => setSnackbar(null)
      );
      setState(prev => ({
        ...prev,
        updatingToken: false,
        snackbar: errorSnackbar,
      }));
    }
  }, []);

  return {
    ...state,
    setSnackbar,
    setActiveCodeExample,
    loadProfile,
    updateToken,
  };
};

