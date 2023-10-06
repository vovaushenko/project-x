import { IStorageStrategy, OperationResult } from '../web-store.types';

export class SessionStorageStrategy implements IStorageStrategy {
  storage: Storage;

  constructor(storage?: Storage) {
    this.storage = storage ?? sessionStorage;
  }
  async init(): Promise<void> {}

  async getOneByKey<TData>(key: string): Promise<OperationResult<TData>> {
    try {
      const storedItem = sessionStorage.getItem(key);
      if (!storedItem) {
        return { success: false, data: 'nothing' as TData };
      }
      return {
        success: true,
        data: JSON.parse(storedItem) as TData,
      };
    } catch (error) {
      const errorMsg = 'Error in session storage getOneByKey: ';
      if (error instanceof SyntaxError) {
        console.error(errorMsg + error.name);
      } else if (error instanceof Error) {
        console.error(errorMsg + error.message);
      }
      return { success: false, data: 'error' as TData };
    }
  }

  async setOneByKey(key: string, value: unknown): Promise<OperationResult<void>> {
    try {
      if (await this.storageAvailable()) {
        const stringifiedValue = JSON.stringify(value);
        sessionStorage.setItem(key, stringifiedValue);
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Error in session storage: setOneByKey');
      return { success: false };
    }
  }

  async remove(key: string): Promise<OperationResult<void>> {
    const keyExists = sessionStorage.getItem(key);
    if (keyExists) {
      sessionStorage.removeItem(key);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async storageAvailable(): Promise<boolean> {
    const testString = '__storage_test__';
    try {
      sessionStorage.setItem(testString, testString);
      sessionStorage.removeItem(testString);
      return true;
    } catch (error) {
      console.error('Error in session storage: storage not available');
      return false;
    }
  }
}
