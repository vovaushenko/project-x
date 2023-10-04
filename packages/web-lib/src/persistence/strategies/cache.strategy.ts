import { IStorageStrategy } from '../web-store.types';

export class CacheStrategy implements IStorageStrategy {
  map: Map<string, unknown>;

  constructor() {
    this.map = new Map();
  }

  async init(): Promise<void> {}

  async getOne(key: string) {
    return this.map.get(key);
  }

  async set(key: string, value: any) {
    throw 'not implemented';
  }

  async remove(key: string) {
    throw 'not implemented';
  }
}
