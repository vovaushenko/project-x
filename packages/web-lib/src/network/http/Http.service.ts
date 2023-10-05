import { AVXErrorFactory, handleHTTPError } from '../../error';
import { AVXError } from '../../error/av-x-error';
import { AVXRequstConfig, HttpClient, IHttpService } from '../types/network.types';
import { FetchHttpClient } from './FetchHttp.client';

export abstract class HttpService implements IHttpService {
  private _errorFactory: AVXErrorFactory = AVXErrorFactory.getInstance();
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient = new FetchHttpClient()) {
    this.httpClient = httpClient;
  }

  @handleHTTPError
  async get<TResponse>(url: string, config?: AVXRequstConfig): Promise<TResponse> {
    const response = await this.httpClient.get(url, config);

    if (!response.ok) {
      throw this._semanticError(response);
    }

    const json = await response.json();
    return json as TResponse;
  }

  @handleHTTPError
  async post<TResponse>(url: string, data?: unknown, config?: AVXRequstConfig): Promise<TResponse> {
    const response = await this.httpClient.post(url, data, config);

    if (!response.ok) {
      throw this._semanticError(response);
    }

    const json = await response.json();
    return json as TResponse;
  }

  @handleHTTPError
  async put<TResponse>(url: string, data?: unknown, config?: AVXRequstConfig): Promise<TResponse> {
    const response = await this.httpClient.put(url, data, config);

    if (!response.ok) {
      throw this._semanticError(response);
    }

    const json = await response.json();
    return json as TResponse;
  }

  @handleHTTPError
  async delete<TResponse>(url: string, config?: AVXRequstConfig): Promise<TResponse> {
    const response = await this.httpClient.delete(url, config);

    if (!response.ok) {
      throw this._semanticError(response);
    }

    const json = await response.json();
    return json as TResponse;
  }

  public setHttpClient(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private _semanticError(response: Response): AVXError {
    const { status, statusText } = response;

    switch (status) {
      case 400:
        return this._errorFactory.createBadRequestError({ message: statusText });
      case 401:
        return this._errorFactory.createUnauthorizedError({ message: statusText });
      case 403:
        return this._errorFactory.createForbiddenError({ message: statusText });
      case 404:
        return this._errorFactory.createNotFoundError({ message: statusText });
      case 500:
        return this._errorFactory.createInternalServerError({ message: statusText });
      case 502:
        return this._errorFactory.createBadGatewayError({ message: statusText });
      case 503:
        return this._errorFactory.createServiceUnavailableError({ message: statusText });
      case 504:
        return this._errorFactory.createGatewayTimeoutError({ message: statusText });
      default:
        return this._errorFactory.createUnknownNetworkError({ message: statusText });
    }
  }
}
