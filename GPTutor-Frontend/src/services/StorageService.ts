export class StorageService<Data> {
  get(key: string): Promise<Data | null> {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key);
      resolve(value ? JSON.parse(value) : null);
    });
  }

  set<Value>(key: string, value: Value): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    });
  }
}
