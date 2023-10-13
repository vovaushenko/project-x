export interface IStorageStrategy {
  getOneByKey<TStoredData>(key: string, context?: any): Promise<OperationResult<TStoredData>>;
  setOneByKey(key: string, value: unknown, context?: any): Promise<OperationResult<void>>;
  remove(key: string, context?: any): Promise<OperationResult<void>>;
  // TODO: plan how context is passed
  init(context?: any): Promise<void>;
}

export type IWebStore = Pick<IStorageStrategy, 'getOneByKey' | 'init' | 'remove' | 'setOneByKey'>;

export type OperationResult<TData> = { success: boolean; data?: TData };
