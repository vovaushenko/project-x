import { AvxNotification } from '../../../entities/notification';
import { AvxNotificationVariant } from '../../../entities/notification/model/notification.types';
import { ToastActionsHandler } from './toast.types';

export const ToastActions: ToastActionsHandler = {
  success: (message: string) => {
    sendToastNotification({ message, variant: 'success' });
  },
  error: (message: string) => {
    sendToastNotification({ message, variant: 'error' });
  },
  info: (message: string) => {
    sendToastNotification({ message, variant: 'info' });
  },
  warn: (message: string) => {
    sendToastNotification({ message, variant: 'warn' });
  },
  message: (message: string) => {
    sendToastNotification({ message, variant: 'message' });
  },
};

export function sendToastNotification({
  message,
  variant,
}: {
  message: string;
  variant: AvxNotificationVariant;
}) {
  AvxNotification.send(new AvxNotification({ message, variant, type: 'toast' }));
}
