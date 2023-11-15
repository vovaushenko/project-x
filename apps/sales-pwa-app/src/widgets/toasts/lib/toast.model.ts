import { AvxNotification } from '../../../entities/notification';
import { IToast, ToastVariant } from './toast.types';

export class AvxToast implements IToast {
  id: string;
  message: string;
  variant: ToastVariant;
  constructor(createToastDto: IToast) {
    this.id = createToastDto.id;
    this.message = createToastDto.message;
    this.variant = createToastDto.variant;
  }

  static fromNotification(notification: AvxNotification) {
    return new AvxToast({
      id: notification.id,
      message: notification.message,
      variant: notification.variant,
    });
  }
}
