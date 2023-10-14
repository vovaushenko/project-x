import { SessionStorageStrategy } from './strategies';
import { IStorageStrategy, IWebStore, OperationResult } from './web-store.types';

export class WebStoreManager implements IWebStore {
  private strategy: IStorageStrategy;

  constructor(strategy?: IStorageStrategy) {
    this.strategy = strategy ?? new SessionStorageStrategy();
  }

  getStrategy(): IStorageStrategy {
    return this.strategy;
  }
  setStrategy(strategy: IStorageStrategy): void {
    this.strategy = strategy;
  }
  async init(context?: any): Promise<void> {
    await this.strategy.init(context);
  }
  async getOneByKey<TData>(key: string): Promise<OperationResult<TData>> {
    return this.strategy.getOneByKey<TData>(key);
  }
  async setOneByKey(key: string, value: unknown): Promise<OperationResult<void>> {
    return this.strategy.setOneByKey(key, value);
  }

  async remove(key: string): Promise<OperationResult<void>> {
    return this.strategy.remove(key);
  }
}
