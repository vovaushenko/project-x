import { describe, expect, it, vi } from 'vitest';
import { IStorageStrategy } from '../web-store.types';
import { StorageContext } from '../web-store-manager';

describe('WebStoreManager', () => {
  const MOCK_STRING = '__storage_test__';
  const MOCK_STRATEGY: IStorageStrategy = {
    getOneByKey: vi.fn().mockImplementation(async (key) => {
      console.log(key);
      return { success: true };
    }),
    setOneByKey: vi.fn().mockImplementation(async (key, value) => {
      console.log(key, value);
      return { success: true };
    }),
    remove: vi.fn().mockImplementation(async (key) => {
      console.log(key);
      return { success: true };
    }),
    init: vi.fn().mockImplementation(async () => {}),
    storageAvailable: vi.fn().mockImplementation(async () => {
      return true;
    }),
  };

  it('should set and get strategy from context', async () => {
    const webStore = new StorageContext();
    webStore.setStrategy(MOCK_STRATEGY);
    const strategy = webStore.getStrategy();
    expect(strategy).toMatchObject(MOCK_STRATEGY);
  });

  it('should invoke strategy init', async () => {
    const webStore = new StorageContext(MOCK_STRATEGY);
    webStore.init();
    expect(MOCK_STRATEGY.init).toHaveBeenCalled();
  });

  it('should invoke strategy getOneByKey', async () => {
    const webStore = new StorageContext(MOCK_STRATEGY);
    webStore.getOneByKey(MOCK_STRING);
    expect(MOCK_STRATEGY.getOneByKey).toHaveBeenCalled();
  });

  it('should invoke strategy setOneByKey', async () => {
    const webStore = new StorageContext(MOCK_STRATEGY);
    webStore.setOneByKey(MOCK_STRING, MOCK_STRING);
    expect(MOCK_STRATEGY.setOneByKey).toHaveBeenCalled();
  });

  it('should invoke strategy remove', async () => {
    const webStore = new StorageContext(MOCK_STRATEGY);
    webStore.remove(MOCK_STRING);
    expect(MOCK_STRATEGY.remove).toHaveBeenCalled();
  });
});
