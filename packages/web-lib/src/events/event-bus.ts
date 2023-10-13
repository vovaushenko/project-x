import { AVXError } from '../error/av-x-error';
import { IEventBus } from './types';

export type AVXWebLibEvent = {
  AVX_Error: AVXError;
  AVX_Notification: { message: string; type: 'success' | 'error' | 'warning' | 'info' };
};

export class AVXEventBus<T> extends EventTarget implements IEventBus<T> {
  constructor() {
    super();
  }

  on<E extends keyof T>(type: E, listener: (event: CustomEvent<T[E]>) => void) {
    this.addEventListener(type as string, listener as EventListenerOrEventListenerObject);
  }

  once<E extends keyof T>(type: E, listener: (event: CustomEvent<T[E]>) => void) {
    this.addEventListener(type as string, listener as EventListenerOrEventListenerObject, {
      once: true,
    });
  }

  off<E extends keyof T>(type: E, listener: (event: CustomEvent<T[E]>) => void) {
    this.removeEventListener(type as string, listener as EventListenerOrEventListenerObject);
  }

  emit<E extends keyof T>(type: E, data?: T[E]) {
    const event = new CustomEvent(type as string, { detail: data });
    this.dispatchEvent(event);
  }
}
