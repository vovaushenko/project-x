import { describe, expect, it } from 'vitest';
import { SessionStorageStrategy } from '../strategies';

describe('SessionStorageStrategy', () => {
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

  it('should set value into session store strategy', async () => {
    const sessionStoreStrategy = new SessionStorageStrategy(MOCK_STORAGE);
    const successMsg = await sessionStoreStrategy.setOneByKey(MOCK_STRING, MOCK_STRING);
    expect(successMsg.success).to.equal(true);
  });

  it('should get value from session store strategy', async () => {
    const sessionStoreStrategy = new SessionStorageStrategy(MOCK_STORAGE);
    const successData = await sessionStoreStrategy.getOneByKey<string>(MOCK_STRING);
    const failData = await sessionStoreStrategy.getOneByKey<string>('foo');
    expect(successData.success).to.equal(true);
    expect(successData.data).to.equal(MOCK_STRING);
    expect(failData.success).to.equal(false);
  });

  it('should remove value from session store strategy', async () => {
    const sessionStoreStrategy = new SessionStorageStrategy(MOCK_STORAGE);
    const successMsg = await sessionStoreStrategy.remove(MOCK_STRING);
    const failMsg = await sessionStoreStrategy.remove('foo');

    expect(successMsg.success).to.equal(true);
    expect(failMsg.success).to.equal(false);
  });
});
