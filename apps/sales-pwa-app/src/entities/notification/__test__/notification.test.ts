import { describe, vi, expect, it } from 'vitest';
import { CreateAvxNotificationDto } from '../model/notification.types';
import { AvxNotification } from '..';

describe('Notification', () => {
  const mockEmit = vi.fn();
  const mockOn = vi.fn();
  const mockOff = vi.fn();
  const mockNotificationTransport = {
    emit: mockEmit,
    on: mockOn,
    off: mockOff,
  } as any; // this is to avoid unnecessary boilerplate of mocking the whole AVXEventBus

  it('should initialize from dto', () => {
    const createNotificationDto: CreateAvxNotificationDto = {
      message: 'test',
      variant: 'success',
      type: 'toast',
    };

    const notification = new AvxNotification(createNotificationDto);
    expect(notification.id).toBeDefined();
    expect(notification.message).toBe(createNotificationDto.message);
    expect(notification.variant).toBe(createNotificationDto.variant);
    expect(notification.type).toBe(createNotificationDto.type);
    expect(notification).toBeInstanceOf(AvxNotification);
  });

  it('should emit notification', () => {
    const createNotificationDto: CreateAvxNotificationDto = {
      message: 'test',
      variant: 'success',
      type: 'toast',
    };

    const notification = new AvxNotification(createNotificationDto);
    AvxNotification.send(notification, mockNotificationTransport);

    AvxNotification.send(notification);

    expect(mockEmit).toHaveBeenCalledWith('AVX_NOTIFICATION', notification);
  });

  it('should allow to subscribe to notification', () => {
    const createNotificationDto: CreateAvxNotificationDto = {
      message: 'test',
      variant: 'success',
      type: 'toast',
    };

    const notification = new AvxNotification(createNotificationDto);
    const handler = () => {};
    const unsubscribe = AvxNotification.subscribe(
      notification.type,
      handler,
      mockNotificationTransport,
    );

    unsubscribe();

    expect(mockOn).toHaveBeenCalledWith('AVX_NOTIFICATION', expect.any(Function));
    expect(mockOff).toHaveBeenCalledWith('AVX_NOTIFICATION', expect.any(Function));
  });
});
