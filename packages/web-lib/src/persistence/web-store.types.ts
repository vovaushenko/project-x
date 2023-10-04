export interface IStorageStrategy {
  getOne<TStoredData>(key: string): Promise<TStoredData | null>;
  set(key: string, value: unknown): Promise<void>;
  remove(key: string): Promise<void>;
  init(): Promise<void>;
}

export type IWebStore = Pick<IStorageStrategy, 'getOne' | 'init' | 'remove' | 'set'>;

export const enum StorageType {
  LocalStorage,
  SessionStorage,
  Cache,
  IndexedDB,
}
