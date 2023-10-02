import { expect, describe, it } from 'vitest';
import { AVXErrorFactory } from '../av-x-error.factory';
import { AVXErrorCode, AVXErrorType } from '../error.types';

describe('AVXErrorFactory', () => {
  const MOCK_ERROR_MESSAGE = 'Test Error';
  const MOCK_ERROR_DETAILS = 'Test Details';
  it('should create a BadRequestError', () => {
    const error = AVXErrorFactory.createBadRequestError({
      message: MOCK_ERROR_MESSAGE,
      details: MOCK_ERROR_DETAILS,
    });

    expect(error).to.be.instanceOf(Error);
    expect(error.type).to.equal(AVXErrorType.NETWORK_ERROR);
    expect(error.code).to.equal(AVXErrorCode.NETWORK_BAD_REQUEST);
    expect(error.message).to.equal(MOCK_ERROR_MESSAGE);
    expect(error.details).to.equal(MOCK_ERROR_DETAILS);
  });
});
