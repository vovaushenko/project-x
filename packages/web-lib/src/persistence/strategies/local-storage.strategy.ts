import { IStorageStrategy } from '../web-store.types';

export class LocalStorageStrategy implements IStorageStrategy {
  async init(): Promise<void> {}

  async getOne<TData>(key: string) {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem) {
        // gracefully handle
        return null;
      }
      return JSON.parse(storedItem) as TData;
    } catch (error) {
      // gracefully handle
      return null;
    }
  }

  async set(key: string, value: unknown) {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }

  async remove(key: string) {
    localStorage.removeItem(key);
  }
}
