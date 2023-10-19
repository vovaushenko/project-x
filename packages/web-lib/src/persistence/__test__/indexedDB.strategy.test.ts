import { describe, expect, it } from 'vitest';
import 'fake-indexeddb';
import { IndexedDBStrategy } from '../strategies/indexedDB.strategy';

describe('IndexedDBStrategy', () => {
  it('should set value into indexed DB', async () => {
    const indexedDBStrategy = new IndexedDBStrategy();
    await indexedDBStrategy.init({ name: 'test', version: 1 });
    const successMsg = await indexedDBStrategy.setOneByKey('foo', 'bar', {});
    expect(successMsg.success).to.equal(true);
  });

  it('should get value from indexedDBStrategy', async () => {
    const indexedDBStrategy = new IndexedDBStrategy();
    await indexedDBStrategy.init({ name: 'test', version: 1 });
    await indexedDBStrategy.setOneByKey('foo', 'bar', {});
    const successMsg = await indexedDBStrategy.getOneByKey('foo', {});
    expect(successMsg.success).to.equal(true);
    expect(successMsg.data).to.equal('bar');
  });

  it('should remove value from indexedDB', async () => {
    const indexedDBStrategy = new IndexedDBStrategy();
    await indexedDBStrategy.init({ name: 'test', version: 1 });
    await indexedDBStrategy.setOneByKey('foo', 'bar', {});
    const successMsg = await indexedDBStrategy.remove('foo', {});
    expect(successMsg.success).to.equal(true);
  });
});
