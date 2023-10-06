import { describe, vi, it, expect } from 'vitest';
import { HttpClient } from '../types/network.types';
import { AVXError } from '../../error/av-x-error';
import { AVXErrorCode } from '../../error/error.types';
import { HttpService } from '../http/Http.service';

describe('HttpService', () => {
  class AppService extends HttpService {
    constructor() {
      super();
    }
  }

  const appService = new AppService();
  const MOCK_API_RESPONSE = { hello: 'world' };

  function getStatusCodeFromUrl(url: string): number {
    if (url.includes('404')) {
      return 404;
    } else if (url.includes('500')) {
      return 500;
    } else if (url.includes('401')) {
      return 401;
    } else {
      return 200;
    }
  }

  const MOCK_HTTP_CLIENT: HttpClient = {
    get: vi.fn().mockImplementation((url: string, _config?: RequestInit) => {
      const statusCode = getStatusCodeFromUrl(url);
      const response = new Response(JSON.stringify(MOCK_API_RESPONSE), {
        status: statusCode,
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
      expect(apiResponse.success).toEqual(true);
      if (apiResponse.success) {
        expect(apiResponse.value).toEqual(MOCK_API_RESPONSE);
      }
    });

    it('should throw semantic AVX 401 error for unauthorized requests', async () => {
      const unauthorizedUrl = 'http://localhost:3000/401';
      try {
        await appService.get(unauthorizedUrl);
      } catch (error) {
        expect(error instanceof AVXError).toBe(true);
        if (error instanceof AVXError) {
          expect(error.code).toBe(AVXErrorCode.NETWORK_UNAUTHORIZED);
        }
      }
    });

    it('should throw semantic AVX 404 error for not found requests', async () => {
      const notFoundUrl = 'http://localhost:3000/404';

      const apiResponse = await appService.get(notFoundUrl);
      expect(apiResponse.success).toBe(false);
      if (!apiResponse.success) {
        expect(apiResponse.error instanceof AVXError).toBe(true);
        expect(apiResponse.error.code).toBe(AVXErrorCode.NETWORK_NOT_FOUND);
      }
    });

    it('should throw semantic AVX 500 error for internal server issues', async () => {
      const serverIssueUrl = 'http://localhost:3000/500';
      const apiResponse = await appService.get(serverIssueUrl);

      expect(apiResponse.success).toBe(false);
      if (!apiResponse.success) {
        expect(apiResponse.error instanceof AVXError).toBe(true);
        expect(apiResponse.error.code).toBe(AVXErrorCode.NETWORK_INTERNAL_SERVER_ERROR);
      }
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
      const apiResponse = await appService.post(MOCK_URL, postPayload);

      expect(MOCK_HTTP_CLIENT.post).toHaveBeenCalled();
      expect(MOCK_HTTP_CLIENT.post).toHaveBeenCalledWith(MOCK_URL, postPayload, undefined);
      expect(apiResponse.success).toEqual(true);
      if (apiResponse.success) {
        expect(apiResponse.value).toEqual(MOCK_API_RESPONSE);
      }
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
      expect(apiResponse.success).toEqual(true);
      if (apiResponse.success) {
        expect(apiResponse.value).toEqual(MOCK_API_RESPONSE);
      }
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
      expect(apiResponse.success).toEqual(true);
      if (apiResponse.success) {
        expect(apiResponse.value).toEqual(MOCK_API_RESPONSE);
      }
    });
  });
});
