import bridge from "@vkontakte/vk-bridge";

export class VkStorageService {
  async get(key: string): Promise<string | null> {
    try {
      const data = await bridge.send("VKWebAppStorageGet", { keys: [key] });
      return data.keys ? data.keys[0].value : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async set<Value extends string>(key: string, value: Value): Promise<boolean> {
    try {
      const data = await bridge.send("VKWebAppStorageSet", {
        key,
        value,
      });

      return data.result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
