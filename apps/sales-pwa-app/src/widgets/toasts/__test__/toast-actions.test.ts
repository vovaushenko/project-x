import { describe, expect, it, vi } from 'vitest';
import { TOAST_VARIANT } from '../config/toasts.config';
import { ToastActions } from '..';
import { AvxNotification } from '../../../entities/notification';

describe('Toast Actions', () => {
  it('should support all kind of application notification types', () => {
    for (const variant of TOAST_VARIANT) {
      expect(ToastActions[variant]).toBeDefined();
    }
  });

  it('should send toast notification using underlying transport - app notification', () => {
    const toastMessage = 'hello';

    const spy = vi.fn();
    AvxNotification.send = spy;

    for (const variant of TOAST_VARIANT) {
      ToastActions[variant](toastMessage);
      expect(spy).toHaveBeenCalled();
    }
    expect(spy).toHaveBeenCalledTimes(TOAST_VARIANT.length);
  });
});
