import * as process from "process";
import bridge from "@vkontakte/vk-bridge";

export class StorageService<Data> {
  get(key: string): Promise<Data | null> {
    if (process.env.NODE_ENV === "development") {
      return new Promise((resolve) => {
        const value = localStorage.getItem(key);
        resolve(value ? JSON.parse(value) : null);
      });
    }

    return new Promise((resolve) => {
      bridge
        .send("VKWebAppStorageGet", { keys: [key] })
        .then((result) => {
          const value = result.keys[0].value;
          resolve(value ? JSON.parse(value) : null);
        })
        .catch(() => resolve(null));
    });
  }

  set<Value>(key: string, value: Value): Promise<boolean> {
    if (process.env.NODE_ENV === "development") {
      return new Promise((resolve) => {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(true);
      });
    }

    return new Promise((resolve) => {
      bridge
        .send("VKWebAppStorageSet", { key, value: JSON.stringify(value) })
        .then(({ result }) => resolve(result))
        .catch(() => resolve(false));
    });
  }
}
