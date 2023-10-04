import { IStorageStrategy } from '../web-store.types';

export class SessionStorageStrategy implements IStorageStrategy {
  async init(): Promise<void> {}

  async getOne(key: string) {
    return sessionStorage.getItem(key);
  }

  async set(key: string, value: any) {
    throw 'not implemented';
  }

  async remove(key: string) {
    throw 'not implemented';
  }
}
