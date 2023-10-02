import { AVXErrorType, AVXErrorCode } from './error.types';

export class AVXError extends Error {
  constructor(
    public readonly type: AVXErrorType,
    public readonly code: AVXErrorCode,
    public readonly message: string,
    public readonly details?: string | string[],
  ) {
    super(message);
  }
}
