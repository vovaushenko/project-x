import { IStorageStrategy } from '../web-store.types';

export class IndexDBStrategy implements IStorageStrategy {
  async init(): Promise<void> {}

  async getOne(key: string) {
    throw 'not implemented';
  }

  async set(key: string, value: any) {
    throw 'not implemented';
  }

  async remove(key: string) {
    throw 'not implemented';
  }
}
