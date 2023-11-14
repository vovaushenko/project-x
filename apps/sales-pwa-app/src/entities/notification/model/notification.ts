import { AVXEventBus } from '@project-x/web-lib';
import { uuidV4 } from '../../../shared/utils';
import {
  AvxNotificationType,
  AvxNotificationVariant,
  CreateAvxNotificationDto,
  IAvxNotification,
} from './notification.types';
import { AvxEvent, AvxSalesEventBus } from '../../../shared/communication/avx-sales-event-bus';

export class AvxNotification implements IAvxNotification {
  id: string;
  message: string;
  variant: AvxNotificationVariant;
  type: AvxNotificationType;

  constructor(dto: CreateAvxNotificationDto) {
    this.id = uuidV4();
    this.message = dto.message;
    this.variant = dto.variant;
    this.type = dto.type;
  }

  static create(dto: CreateAvxNotificationDto) {
    return new AvxNotification(dto);
  }

  static send(
    notification: AvxNotification,
    notificationTransport: AVXEventBus<AvxEvent> = AvxSalesEventBus,
  ) {
    notificationTransport.emit('AVX_NOTIFICATION', notification);
  }

  static subscribe(
    type: AvxNotificationType,
    callback: (evt: CustomEvent<AvxNotification>) => void,
    notificationTransport: AVXEventBus<AvxEvent> = AvxSalesEventBus,
  ) {
    const handler = (notificationEvent: CustomEvent<AvxNotification>) => {
      if (notificationEvent.detail.type === type) {
        callback(notificationEvent);
      }
    };

    notificationTransport.on('AVX_NOTIFICATION', handler);

    return () => {
      notificationTransport.off('AVX_NOTIFICATION', handler);
    };
  }
}
