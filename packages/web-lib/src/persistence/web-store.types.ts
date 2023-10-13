export interface IStorageStrategy {
  getOneByKey<TStoredData>(key: string): Promise<OperationResult<TStoredData>>;
  setOneByKey(key: string, value: unknown): Promise<OperationResult<void>>;
  remove(key: string): Promise<OperationResult<void>>;
  init(): Promise<void>;
  storageAvailable(): Promise<boolean>;
}

export type IWebStore = Pick<IStorageStrategy, 'getOneByKey' | 'init' | 'remove' | 'setOneByKey'>;

export type OperationResult<TData> = { success: boolean; data?: TData };
