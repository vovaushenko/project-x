import { expect, describe, it } from 'vitest';
import { AVXErrorType, AVXErrorCode } from '../error.types';
import { AVXError } from '../av-x-error';

describe('AVXError', () => {
  it('should be an instance of Error', () => {
    const error = new AVXError(
      AVXErrorType.GENERIC_ERROR,
      AVXErrorCode.NETWORK_BAD_REQUEST,
      'Test Error',
    );
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct properties', () => {
    const error = new AVXError(
      AVXErrorType.GENERIC_ERROR,
      AVXErrorCode.NETWORK_BAD_REQUEST,
      'Test Error',
    );
    expect(error.type).toBe(AVXErrorType.GENERIC_ERROR);
    expect(error.code).toBe(AVXErrorCode.NETWORK_BAD_REQUEST);
    expect(error.message).toBe('Test Error');
    expect(error.details).toBeUndefined();
  });

  it('should accept details', () => {
    const error = new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_UNKNOWN_ERROR,
      'Network Error',
      'Connection lost',
    );
    expect(error.details).toBe('Connection lost');
  });

  it('should have the correct stack trace', () => {
    const error = new AVXError(
      AVXErrorType.CUSTOM_ERROR,
      AVXErrorCode.NETWORK_NOT_FOUND,
      'Custom Error',
    );
    expect(error.stack).toBeDefined();
  });
});
