import { describe, vi, it, expect } from 'vitest';
import { HttpService } from '../http/Http.service';
import { HttpClient } from '../types/network.types';

describe('HttpService', () => {
  class AppService extends HttpService {
    constructor() {
      super();
    }
  }

  const appService = new AppService();
  const MOCK_API_RESPONSE = { hello: 'world' };

  const MOCK_HTTP_CLIENT: HttpClient = {
    get: vi.fn().mockImplementation((_url: string, _config?: RequestInit) => {
      const response = new Response(JSON.stringify(MOCK_API_RESPONSE), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      });

      return Promise.resolve(response);
    }),
    post: vi.fn().mockImplementation((url: string, data?: unknown, config?: RequestInit) => {
      // Create a new Response object for each call
      const response = new Response(JSON.stringify(MOCK_API_RESPONSE), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      });

      return Promise.resolve(response);
    }),
    put: vi.fn().mockImplementation((url: string, data?: unknown, config?: RequestInit) => {
      // Create a new Response object for each call
      const response = new Response(JSON.stringify(MOCK_API_RESPONSE), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      });

      return Promise.resolve(response);
    }),
    delete: vi.fn().mockImplementation((url: string, data?: unknown, config?: RequestInit) => {
      // Create a new Response object for each call
      const response = new Response(JSON.stringify(MOCK_API_RESPONSE), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      });

      return Promise.resolve(response);
    }),
  };

  const MOCK_URL = 'http://localhost:3000';

  appService.setHttpClient(MOCK_HTTP_CLIENT);

  describe('get', () => {
    it('should call httpClient.get with specified params', async () => {
      await appService.get(MOCK_URL, { cachable: true });
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalledWith(MOCK_URL, { cachable: true });
    });

    it('should call httpClient.get with specified params if config is not defined', async () => {
      await appService.get(MOCK_URL);
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalledWith(MOCK_URL, undefined);
    });

    it('should call httpClient.get with specified params and return expected api response', async () => {
      const apiResponse = await appService.get(MOCK_URL);
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalledWith(MOCK_URL, undefined);
      expect(apiResponse).toEqual(MOCK_API_RESPONSE);
    });
  });

  describe('post', () => {
    it('should call httpClient.post with specified params', async () => {
      const postPayload = { hello: 'world' };
      await appService.post(MOCK_URL, postPayload);

      expect(MOCK_HTTP_CLIENT.post).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.post).toHaveBeenCalledWith(MOCK_URL, postPayload, undefined);
    });

    it('should call httpClient.post and return expected api response', async () => {
      const postPayload = { hello: 'world' };
      const apiRespinse = await appService.post(MOCK_URL, postPayload);

      expect(MOCK_HTTP_CLIENT.post).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.post).toHaveBeenCalledWith(MOCK_URL, postPayload, undefined);
      expect(apiRespinse).toEqual(MOCK_API_RESPONSE);
    });
  });

  describe('put', () => {
    it('should call httpClient.put with specified params', async () => {
      const postPayload = { hello: 'world' };
      await appService.put(MOCK_URL, postPayload, { cachable: true });

      expect(MOCK_HTTP_CLIENT.put).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.put).toHaveBeenCalledWith(MOCK_URL, postPayload, { cachable: true });
    });

    it('should call httpClient.put with specified params and return expected api response', async () => {
      const postPayload = { hello: 'world' };
      const apiResponse = await appService.put(MOCK_URL, postPayload, { cachable: true });

      expect(MOCK_HTTP_CLIENT.put).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.put).toHaveBeenCalledWith(MOCK_URL, postPayload, { cachable: true });
      expect(apiResponse).toEqual(MOCK_API_RESPONSE);
    });
  });

  describe('delete', () => {
    it('should call httpClient.delete with specified params', async () => {
      await appService.delete(MOCK_URL);

      expect(MOCK_HTTP_CLIENT.delete).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.delete).toHaveBeenCalledWith(MOCK_URL, undefined);
    });

    it('should call httpClient.delete with specified params and return expected api response', async () => {
      const apiResponse = await appService.delete(MOCK_URL);

      expect(MOCK_HTTP_CLIENT.delete).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.delete).toHaveBeenCalledWith(MOCK_URL, undefined);
      expect(apiResponse).toEqual(MOCK_API_RESPONSE);
    });
  });
});
