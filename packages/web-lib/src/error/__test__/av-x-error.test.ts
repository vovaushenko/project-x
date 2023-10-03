import { expect, describe, it } from 'vitest';
import { AVXErrorType, AVXErrorCode } from '../error.types';
import { AVXError } from '../av-x-error';

describe('AVXError', () => {
  it('should be an instance of Error', () => {
    const error = new AVXError({
      code: AVXErrorCode.NETWORK_BAD_REQUEST,
      type: AVXErrorType.NETWORK_ERROR,
      message: 'Test Error',
    });
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct properties', () => {
    const error = new AVXError({
      type: AVXErrorType.GENERIC_ERROR,
      code: AVXErrorCode.NETWORK_BAD_REQUEST,
      message: 'Test Error',
    });
    expect(error.type).toBe(AVXErrorType.GENERIC_ERROR);
    expect(error.code).toBe(AVXErrorCode.NETWORK_BAD_REQUEST);
    expect(error.message).toBe('Test Error');
    expect(error.details).toBeUndefined();
  });

  it('should accept details', () => {
    const error = new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_GATEWAY_TIMEOUT,
      message: 'Test Error',
      details: 'Connection lost',
    });
    expect(error.details).toBe('Connection lost');
  });

  it('should have the correct stack trace', () => {
    const error = new AVXError({
      type: AVXErrorType.CUSTOM_ERROR,
      code: AVXErrorCode.NETWORK_NOT_FOUND,
      message: 'Custom Error',
    });
    expect(error.stack).toBeDefined();
  });
});
