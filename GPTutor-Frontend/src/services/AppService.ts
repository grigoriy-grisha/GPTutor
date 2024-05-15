import { sig } from "dignals";
import { RoutingPages } from "$/entity/routing";

export enum AppInstanceType {
  StableArt = "Stable Art",
  GPTutor = "GPTutor",
  AiHumor = "AiHumor",
}

class AppService {
  loading = sig(true);

  appInstance = (window as any).env.REACT_APP;

  toggleLoading() {
    this.loading.set(!this.loading.get());
  }

  isStableArt() {
    return this.appInstance === AppInstanceType.StableArt;
  }

  isGPTutor() {
    return this.appInstance === AppInstanceType.GPTutor;
  }

  isAiHumor() {
    return this.appInstance === AppInstanceType.AiHumor;
  }

  getGroupId() {
    return this.isAiHumor() ? 201104273 : 220371433;
  }

  getBasePanel() {
    if (this.isGPTutor()) {
      return RoutingPages.home;
    }

    if (this.isStableArt()) {
      return RoutingPages.generationImages;
    }

    return RoutingPages.mainAnecdote;
  }

  getAppId() {
    return Number(new URLSearchParams(location.search).get("vk_app_id"));
  }
}

export const appService = new AppService();
