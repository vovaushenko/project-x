import {
  CacheStrategy,
  LocalStorageStrategy,
  SessionStorageStrategy,
  IndexDBStrategy,
} from './strategies';
import { IStorageStrategy, IWebStore, StorageType } from './web-store.types';

export class StorageContext implements IWebStore {
  strategy: IStorageStrategy;

  constructor(type: StorageType) {
    this.strategy = this.setStrategy(type);
  }

  setStrategy(type: StorageType): IStorageStrategy {
    switch (type) {
      case StorageType.LocalStorage:
        return new LocalStorageStrategy();
      case StorageType.SessionStorage:
        return new SessionStorageStrategy();
      case StorageType.Cache:
        return new CacheStrategy();
      case StorageType.IndexedDB:
        return new IndexDBStrategy();
      default:
        throw new Error('Invalid storage type');
    }
  }
  async init(): Promise<void> {
    await this.strategy.init();
  }
  async getOne<TData>(key: string): Promise<TData | null> {
    return this.strategy.getOne<TData>(key);
  }
  async remove(key: string): Promise<void> {}
  async set(key: string, value: unknown): Promise<void> {}
}

const webStore = new StorageContext(StorageType.LocalStorage);

const foo = async () => {
  type IUser = {
    id: string;
    name: string;
  };

  const user = await webStore.getOne<IUser>('hello-world');
};
