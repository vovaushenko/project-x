import { AVXError } from './av-x-error';
import { AVXErrorType, ICreateAVXErrorFunction, AVXErrorCode } from './error.types';

export class AVXErrorFactory {
  static createBadRequestError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_BAD_REQUEST,
      message: createAvxErrorDto.message || 'Bad Request',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createForbiddenError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_FORBIDDEN,
      message: createAvxErrorDto.message || 'Forbidden',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createNotFoundError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_NOT_FOUND,
      message: createAvxErrorDto.message || 'Not Found',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createInternalServerError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_INTERNAL_SERVER_ERROR,
      message: createAvxErrorDto.message || 'Internal Server Error',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createBadGatewayError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_BAD_GATEWAY,
      message: createAvxErrorDto.message || 'Bad Gateway',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createServiceUnavailableError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_SERVICE_UNAVAILABLE,
      message: createAvxErrorDto.message || 'Service Unavailable',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createGatewayTimeoutError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_GATEWAY_TIMEOUT,
      message: createAvxErrorDto.message || 'Gateway Timeout',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createUnknownNetworkError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_UNKNOWN_ERROR,
      message: createAvxErrorDto.message || 'Unknown Network Error',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createUnauthorizedError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.NETWORK_ERROR,
      code: AVXErrorCode.NETWORK_UNAUTHORIZED,
      message: createAvxErrorDto.message || 'Unauthorized',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createStateManagementError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.CUSTOM_ERROR,
      code: AVXErrorCode.STATE_MANAGEMENT_ERROR,
      message: createAvxErrorDto.message || 'State Management Error',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };

  static createGenericError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError({
      type: AVXErrorType.GENERIC_ERROR,
      code: AVXErrorCode.WARNING,
      message: createAvxErrorDto.message || 'Generic Error',
      ...(createAvxErrorDto.details ? { details: createAvxErrorDto.details } : {}),
      ...(createAvxErrorDto.metadata ? { metadata: createAvxErrorDto.metadata } : {}),
    });
  };
}
