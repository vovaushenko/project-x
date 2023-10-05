export interface AVXRequstConfig extends RequestInit {
  cachable?: boolean;
}

export interface IHttpService {
  get<TResponse>(url: string, config?: AVXRequstConfig): Promise<TResponse>;
  post<TResponse>(url: string, data?: unknown, config?: AVXRequstConfig): Promise<TResponse>;
  put<TResponse>(url: string, data?: unknown, config?: AVXRequstConfig): Promise<TResponse>;
  delete<TResponse>(url: string, config?: AVXRequstConfig): Promise<TResponse>;
}

export interface HttpClient {
  get(url: string, config?: AVXRequstConfig): Promise<Response>;
  post(url: string, data?: unknown, config?: AVXRequstConfig): Promise<Response>;
  put(url: string, data?: unknown, config?: AVXRequstConfig): Promise<Response>;
  delete(url: string, config?: AVXRequstConfig): Promise<Response>;
}
