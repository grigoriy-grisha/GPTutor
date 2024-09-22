import { sig } from "dignals";
import { RoutingPages } from "$/entity/routing";

export enum AppInstanceType {
  StableArt = "Stable Art",
  GPTutor = "GPTutor",
  AiHumor = "AiHumor",
  SmartVkDoc = "SmartVkDoc",
}

class AppService {
  loading = sig(true);

  appInstance = (window as any).env.REACT_APP;
  appPlatform = (window as any).env.REACT_PLATFORM;

  isTG() {
    return this.appPlatform === "TG";
  }

  isVK() {
    return this.appPlatform === "VK";
  }

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

  isSmartVkDoc() {
    return this.appInstance === AppInstanceType.SmartVkDoc;
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

    if (this.isSmartVkDoc()) {
      return RoutingPages.vkDocQuestionPanel;
    }

    return RoutingPages.mainAnecdote;
  }

  getAppId() {
    return Number(new URLSearchParams(location.search).get("vk_app_id"));
  }

  getGPTName() {
    return this.isTG() ? "Deep.GPT" : "GPTutor";
  }
}

export const appService = new AppService();
