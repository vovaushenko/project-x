import { describe, expect, it } from 'vitest';
import { LocalStorageStrategy } from '../strategies';

describe('LocalStorageStrategy', () => {
  const MOCK_STRING: string = '__storage_test__';
  const MOCK_STORAGE: Storage = {
    getItem: (key) => {
      if (key === MOCK_STRING) {
        return JSON.stringify(MOCK_STRING);
      } else {
        return null;
      }
    },
    setItem: (key, _value) => {
      if (key === MOCK_STRING) {
        console.log(_value);
      } else {
        throw DOMException;
      }
    },
    removeItem: (key) => {
      console.log(key);
    },
    length: 0,
    clear: function (): void {
      throw new Error('Function not implemented.');
    },
    key: function (): string | null {
      throw new Error('Function not implemented.');
    },
  };

  it('should set value into local store strategy', async () => {
    const localStoreStrategy = new LocalStorageStrategy(MOCK_STORAGE);
    const successMsg = await localStoreStrategy.setOneByKey(MOCK_STRING, MOCK_STRING);
    expect(successMsg.success).to.equal(true);
  });

  it('should get value from local store strategy', async () => {
    const localStoreStrategy = new LocalStorageStrategy(MOCK_STORAGE);
    const successData = await localStoreStrategy.getOneByKey<string>(MOCK_STRING);
    const failData = await localStoreStrategy.getOneByKey<string>('foo');
    expect(successData.success).to.equal(true);
    expect(successData.data).to.equal(MOCK_STRING);
    expect(failData.success).to.equal(false);
  });

  it('should remove value from local store strategy', async () => {
    const localStoreStrategy = new LocalStorageStrategy(MOCK_STORAGE);
    const successMsg = await localStoreStrategy.remove(MOCK_STRING);
    const failMsg = await localStoreStrategy.remove('foo');

    expect(successMsg.success).to.equal(true);
    expect(failMsg.success).to.equal(false);
  });
});
