import { IStorageStrategy, OperationResult } from '../web-store.types';

export class LocalStorageStrategy implements IStorageStrategy {
  storage: Storage;

  constructor(storage?: Storage) {
    this.storage = storage ?? localStorage;
  }

  async init(): Promise<void> {}

  async getOneByKey<TData>(key: string): Promise<OperationResult<TData>> {
    try {
      const storedItem = this.storage.getItem(key);
      if (!storedItem) {
        return { success: false };
      }
      return {
        success: true,
        data: JSON.parse(storedItem) as TData,
      };
    } catch (error) {
      const errorMsg = 'Error in local storage getOneByKey: ';
      if (error instanceof SyntaxError) {
        console.error(errorMsg + error.name);
      } else if (error instanceof Error) {
        console.error(errorMsg + error.message);
      }
      return { success: false };
    }
  }

  async setOneByKey(key: string, value: unknown): Promise<OperationResult<void>> {
    try {
      if (await this.storageAvailable()) {
        const stringifiedValue = JSON.stringify(value);
        this.storage.setItem(key, stringifiedValue);
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      // need to check if error is quotaExceeded, later custom
      // implementation for handling
      console.error('Error in local storage: setOneByKey');
      return { success: false };
    }
  }

  async remove(key: string): Promise<OperationResult<void>> {
    const keyExists = this.storage.getItem(key);
    if (keyExists) {
      this.storage.removeItem(key);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  private async storageAvailable(): Promise<boolean> {
    const testString = '__storage_test__';
    try {
      this.storage.setItem(testString, testString);
      this.storage.removeItem(testString);
      return true;
    } catch (error) {
      console.error('Error in local storage: storage not available');
      return false;
    }
  }
}
