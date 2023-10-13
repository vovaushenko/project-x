import { describe, it, expect } from 'vitest';
import { AVXError } from '../../error/av-x-error';
import { AVXEventBus } from '../event-bus';

describe('Event Bus', () => {
  type TestEventNamespace = {
    TEST_EVENT: { message: string; type: 'success' | 'error' | 'warning' | 'info' };
    TEST_ERROR: AVXError;
  };

  const eventBus = new AVXEventBus<TestEventNamespace>();

  it('should be able to instantiate', () => {
    expect(eventBus).toBeTruthy();
    expect(eventBus).toBeInstanceOf(AVXEventBus);
  });

  it('should add and remove an event listener', () => {
    let eventFired = false;

    const listener = (event: CustomEvent<TestEventNamespace['TEST_EVENT']>) => {
      eventFired = true;
      expect(event.detail.message).toBe('Test Message');
    };

    eventBus.on('TEST_EVENT', listener);

    // Emit the event
    eventBus.emit('TEST_EVENT', { message: 'Test Message', type: 'success' });

    expect(eventFired).toBe(true);

    // Remove the listener and emit the event again
    eventFired = false;
    eventBus.off('TEST_EVENT', listener);
    eventBus.emit('TEST_EVENT', { message: 'Test Message', type: 'success' });

    expect(eventFired).toBe(false);
  });

  it('should add a one-time event listener', () => {
    let eventFired = false;

    const listener = (event: CustomEvent<TestEventNamespace['TEST_EVENT']>) => {
      eventFired = true;
      expect(event.detail.message).toBe('Test Message');
    };

    eventBus.once('TEST_EVENT', listener);

    // Emit the event
    eventBus.emit('TEST_EVENT', { message: 'Test Message', type: 'success' });

    expect(eventFired).toBe(true);

    // Emit the event again, but the listener should not fire this time
    eventFired = false;
    eventBus.emit('TEST_EVENT', { message: 'Test Message', type: 'success' });

    expect(eventFired).toBe(false);
  });

  it('should emit an event', () => {
    let eventFired = false;

    eventBus.on('TEST_EVENT', (event) => {
      eventFired = true;
      expect(event.detail.message).toBe('Test Message');
    });

    // Emit the event
    eventBus.emit('TEST_EVENT', { message: 'Test Message', type: 'success' });

    expect(eventFired).toBe(true);
  });
});
