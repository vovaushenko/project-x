import { AVXError, AVXEventBus } from '@project-x/web-lib';
import { AvxNotification } from '../../entities/notification';

export type AvxEvent = {
  AVX_ERROR: AVXError;
  AVX_NOTIFICATION: AvxNotification;
};

export const AvxSalesEventBus = new AVXEventBus<AvxEvent>();
