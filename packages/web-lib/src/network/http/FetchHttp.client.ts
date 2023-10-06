import { AVXRequstConfig, HttpClient } from '../types/network.types';

export class FetchHttpClient implements HttpClient {
  async get(url: string, config?: AVXRequstConfig): Promise<Response> {
    return fetch(url, {
      method: 'GET',
      ...config,
    });
  }

  async post(url: string, data?: unknown, config?: AVXRequstConfig): Promise<Response> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  async put(url: string, data?: unknown, config?: AVXRequstConfig): Promise<Response> {
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  async delete(url: string, config?: AVXRequstConfig): Promise<Response> {
    return fetch(url, {
      method: 'DELETE',
      ...config,
    });
  }
}
