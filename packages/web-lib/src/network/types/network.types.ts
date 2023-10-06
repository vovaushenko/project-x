import { Result } from '@project-x/common';
import { AVXError } from '../../error/av-x-error';

export interface AVXRequstConfig extends RequestInit {
  cachable?: boolean;
}

export interface IHttpService {
  get<TResponse>(url: string, config?: AVXRequstConfig): Promise<Result<TResponse, AVXError>>;
  post<TResponse>(
    url: string,
    data?: unknown,
    config?: AVXRequstConfig,
  ): Promise<Result<TResponse, AVXError>>;
  put<TResponse>(
    url: string,
    data?: unknown,
    config?: AVXRequstConfig,
  ): Promise<Result<TResponse, AVXError>>;
  delete<TResponse>(url: string, config?: AVXRequstConfig): Promise<Result<TResponse, AVXError>>;
}

export interface HttpClient {
  get(url: string, config?: AVXRequstConfig): Promise<Response>;
  post(url: string, data?: unknown, config?: AVXRequstConfig): Promise<Response>;
  put(url: string, data?: unknown, config?: AVXRequstConfig): Promise<Response>;
  delete(url: string, config?: AVXRequstConfig): Promise<Response>;
}
