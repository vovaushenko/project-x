export interface IEventBus<T> {
  on<E extends keyof T>(type: E, listener: (event: CustomEvent<T[E]>) => void): void;
  once<E extends keyof T>(type: E, listener: (event: CustomEvent<T[E]>) => void): void;
  off<E extends keyof T>(type: E, listener: (event: CustomEvent<T[E]>) => void): void;
  emit<E extends keyof T>(type: E, data?: T[E]): void;
}
