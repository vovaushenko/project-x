import { IStorageStrategy, OperationSuccessResult } from '../web-store.types';

export class LocalStorageStrategy implements IStorageStrategy {
  async init(): Promise<void> {}

  async getOne<TData>(key: string) {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem) {
        // gracefully handle
        return {
          success: false,
          data: null,
        };
      }
      return {
        success: true,
        data: JSON.parse(storedItem) as TData,
      };
    } catch (error) {
      // gracefully handle
      return {
        success: false,
        data: null,
      };
    }
  }

  async set(key: string, value: unknown) {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }

  async remove(key: string): OperationSuccessResult<void> {
    const storedItemKeys = Object.keys(localStorage);

    const isItemStored = storedItemKeys.includes(key);
    if (isItemStored) {
      localStorage.removeItem(key);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
