/**
 * This type indicates that the value can be null
 * Maybe<IUser>
 */
export type Maybe<T> = T | null;

/**
 * This type generates generic result flow for success and failure
 * example:
 * function divide(a: number, b: number): Result<number, string> {
 * if (b === 0) {
 *   return { success: false, error: 'Cannot divide by zero' };
 *  }
 *  return { success: true, value: a / b };
}

 */
export type Result<T, E> = Success<T> | Failure<E>;

type Success<T> = {
  success: true;
  value: T;
};

type Failure<E> = {
  success: false;
  error: E;
};
