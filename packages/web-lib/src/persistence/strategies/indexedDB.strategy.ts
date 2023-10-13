import { OperationResult } from '../web-store.types';
import { IStorageStrategy } from '../web-store.types';
export interface OpenDBCallbacks {
  upgrade?(database: IDBDatabase, event: IDBVersionChangeEvent): void;
}
export class IndexedDBStrategy implements IStorageStrategy {
  private store: IDBDatabase | null = null;
  private name: string = 'default-db';
  private version: number = 1;
  private DEFAULT_KEY_VAL_STORE = 'default-key-val-store';

  constructor() {}

  private openDB(
    name: string,
    version: number,
    { upgrade }: OpenDBCallbacks = {},
  ): Promise<IDBDatabase> {
    return new Promise((resolve) => {
      const request = indexedDB.open(name, version);
      if (upgrade) {
        request.onupgradeneeded = (event) => upgrade(request.result, event);
      } else {
        request.onupgradeneeded = () => {
          const db = request.result;
          db.createObjectStore(this.DEFAULT_KEY_VAL_STORE);
        };
      }
      request.onsuccess = () => resolve(request.result);
    });
  }

  async init(context: any): Promise<void> {
    const { name, version, upgrade } = context;
    const isDbContextProvided = name && (version || version === 0);
    if (isDbContextProvided) {
      this.name = name;
      this.version = version;
      this.store = await this.openDB(name, version, { upgrade });
    }
  }

  async getOneByKey<TData>(key: string, context?: any): Promise<OperationResult<TData>> {
    let { objectStoreName } = context;
    if (!this.store) return { success: false };

    objectStoreName = objectStoreName ?? this.DEFAULT_KEY_VAL_STORE;
    const transaction = this.store.transaction(objectStoreName);
    const store = transaction.objectStore(objectStoreName);
    return new Promise((resolve) => {
      let result: OperationResult<TData>;
      const query = store.get(key);
      query.onsuccess = function () {
        if (query.result) {
          result = { success: true, data: query.result as TData };
        } else {
          result = { success: false };
        }
      };
      query.onerror = function () {
        result = { success: false };
      };
      transaction.oncomplete = function () {
        resolve(result);
      };
    });
  }

  async setOneByKey(key: string, value: unknown, context?: any): Promise<OperationResult<void>> {
    let { objectStoreName } = context;
    if (!this.store) return { success: false };

    objectStoreName = objectStoreName ?? this.DEFAULT_KEY_VAL_STORE;
    const transaction = this.store.transaction(objectStoreName, 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    return new Promise((resolve) => {
      let result: OperationResult<void>;
      const updateRequest = store.put(value, key);
      updateRequest.onsuccess = function () {
        result = { success: true };
      };
      updateRequest.onerror = function () {
        result = { success: false };
      };
      transaction.oncomplete = function () {
        resolve(result);
      };
    });
  }

  async remove(key: string, context?: any): Promise<OperationResult<void>> {
    let { objectStoreName } = context;
    if (!this.store) return { success: false };

    objectStoreName = objectStoreName ?? this.DEFAULT_KEY_VAL_STORE;
    const transaction = this.store.transaction(objectStoreName, 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    return new Promise((resolve) => {
      let result: OperationResult<void>;
      const deleteRequest = store.delete(key);
      deleteRequest.onsuccess = function () {
        result = { success: true };
      };
      deleteRequest.onerror = function () {
        result = { success: false };
      };
      transaction.oncomplete = function () {
        resolve(result);
      };
    });
  }
}
