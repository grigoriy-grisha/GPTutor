import { appService } from "$/services/AppService";
import bridge from "@vkontakte/vk-bridge";

class PlatformAdapterService {
  async webAppInit() {
    if (appService.isTG()) return Promise.resolve();
    return bridge.send("VKWebAppInit");
  }
}

export const platformAdapter = new PlatformAdapterService();
