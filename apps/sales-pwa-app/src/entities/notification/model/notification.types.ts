export type AvxNotificationVariant = 'info' | 'warn' | 'error' | 'success' | 'message';

export type AvxNotificationType = 'toast' | 'dialog' | 'modal';

export type IAvxNotification = {
  id: string;
  message: string;
  variant: AvxNotificationVariant;
  type: AvxNotificationType;
};

export type CreateAvxNotificationDto = Pick<IAvxNotification, 'message' | 'variant' | 'type'>;
