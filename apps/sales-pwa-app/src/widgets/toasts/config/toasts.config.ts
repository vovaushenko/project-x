import { AvxNotificationVariant } from '../../../entities/notification/model/notification.types';

export const TOAST_SHELF_LIFE = 3 * 1000; // 3 seconds

export const TOAST_VARIANT: readonly AvxNotificationVariant[] = [
  'error',
  'warn',
  'success',
  'info',
  'message',
] as const;
