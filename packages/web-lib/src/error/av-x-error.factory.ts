import { AVXError } from './av-x-error';
import { AVXErrorType, ICreateAVXErrorFunction, AVXErrorCode } from './error.types';

export class AVXErrorFactory {
  static createBadRequestError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_BAD_REQUEST,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createForbiddenError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_FORBIDDEN,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createNotFoundError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_NOT_FOUND,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createInternalServerError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_INTERNAL_SERVER_ERROR,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createBadGatewayError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_BAD_GATEWAY,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createServiceUnavailableError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_SERVICE_UNAVAILABLE,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createGatewayTimeoutError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_GATEWAY_TIMEOUT,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createUnknownNetworkError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_UNKNOWN_ERROR,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createUnauthorizedError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.NETWORK_ERROR,
      AVXErrorCode.NETWORK_UNAUTHORIZED,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createStateManagementError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.CUSTOM_ERROR,
      AVXErrorCode.STATE_MANAGEMENT_ERROR,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };

  static createGenericError: ICreateAVXErrorFunction = (createAvxErrorDto) => {
    return new AVXError(
      AVXErrorType.GENERIC_ERROR,
      AVXErrorCode.WARNING,
      createAvxErrorDto.message,
      createAvxErrorDto.details,
    );
  };
}
