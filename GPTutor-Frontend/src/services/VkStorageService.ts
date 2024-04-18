import bridge from "@vkontakte/vk-bridge";

type ReturnData<Key extends string | string[]> = Key extends string[]
  ? { key: string; value: string }[]
  : string;

export class VkStorageService {
  async get<Key extends string | string[]>(
    key: Key
  ): Promise<ReturnData<Key> | null> {
    try {
      if (Array.isArray(key)) {
        const data = await bridge.send("VKWebAppStorageGet", { keys: key });
        return data.keys as any;
      }

      const data = await bridge.send("VKWebAppStorageGet", { keys: [key] });
      return (data.keys ? data.keys[0].value : null) as any;
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

export const vkStorageService = new VkStorageService();
