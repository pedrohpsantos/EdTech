import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockApi = vi.hoisted(() => ({
  post: vi.fn(),
  get: vi.fn(),
  patch: vi.fn(),
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  },
}));

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockApi),
  },
}));

import * as api from '../api';

const requestInterceptor = mockApi.interceptors.request.use.mock.calls[0][0] as any;
const responseInterceptorResolve = mockApi.interceptors.response.use.mock.calls[0][0] as any;
const responseInterceptorReject = mockApi.interceptors.response.use.mock.calls[0][1] as any;

describe('api.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('handles successful login without MFA', async () => {
      mockApi.post.mockResolvedValueOnce({ status: 200, data: { user: { id: 1 } } });
      const result = await api.login('test@test.com', 'pass');
      expect(result.sucesso).toBe(true);
      expect(result.dados.id).toBe(1);
    });

    it('handles successful login with MFA required', async () => {
      mockApi.post.mockResolvedValueOnce({
        status: 202,
        data: { mfaRequired: true, email: 'test@test.com' },
      });
      const result = await api.login('test@test.com', 'pass');
      expect(result.sucesso).toBe(true);
      expect(result.dados.mfaRequired).toBe(true);
    });

    it('handles login error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error('Network Error'));
      const result = await api.login('test@test.com', 'pass');
      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Network Error');
    });
  });

  describe('verify2FaLogin', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: { user: { id: 1 } } });
      const result = await api.verify2FaLogin('test@test.com', 'pass', '123456');
      expect(result.sucesso).toBe(true);
      expect(result.dados.id).toBe(1);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid code' } } });
      const result = await api.verify2FaLogin('test@test.com', 'pass', '123456');
      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Invalid code');
    });
  });

  describe('setup2Fa', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: { secret: 'secret', qrCodeUri: 'uri' } });
      const result = await api.setup2Fa();
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.setup2Fa();
      expect(result.sucesso).toBe(false);
    });
  });

  describe('enable2Fa', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const result = await api.enable2Fa('123456');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.enable2Fa('123456');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('register', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: { user: { id: 1 } } });
      const result = await api.register('User', 'test@test.com', 'pass', 'USER');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.register('User', 'test@test.com', 'pass', 'USER');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('verifyRegistration', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: { user: { id: 1 } } });
      const result = await api.verifyRegistration('test@test.com', '123456');
      expect(result.sucesso).toBe(true);
      expect(result.dados.id).toBe(1);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.verifyRegistration('test@test.com', '123456');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('logout', () => {
    it('handles success', async () => {
      localStorage.setItem('token', 'token');
      mockApi.post.mockResolvedValueOnce({});
      const result = await api.logout();
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      localStorage.setItem('token', 'token');
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.logout();
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getMe', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: { id: 1 } });
      const result = await api.getMe();
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.getMe();
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getProjects', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [] });
      const result = await api.getProjects();
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.getProjects();
      expect(result.sucesso).toBe(false);
    });
  });

  describe('joinProject', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const result = await api.joinProject('1');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.joinProject('1');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getDocuments', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [] });
      const result = await api.getDocuments('1', 'title', 'status', 0, 10);
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.getDocuments();
      expect(result.sucesso).toBe(false);
    });
  });

  describe('reviewDocument', () => {
    it('handles success', async () => {
      mockApi.patch.mockResolvedValueOnce({ data: {} });
      const result = await api.reviewDocument('1', 'APPROVED', 'feedback');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.patch.mockRejectedValueOnce(new Error());
      const result = await api.reviewDocument('1', 'APPROVED');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getDownloadUrl', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: {} });
      const result = await api.getDownloadUrl('1');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.getDownloadUrl('1');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('toggleStar', () => {
    it('handles success', async () => {
      mockApi.patch.mockResolvedValueOnce({ data: {} });
      const result = await api.toggleStar('1');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.patch.mockRejectedValueOnce(new Error());
      const result = await api.toggleStar('1');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getComments', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [] });
      const result = await api.getComments('1');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.getComments('1');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('addComment', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const result = await api.addComment('1', 'comment');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.addComment('1', 'comment');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getDashboardStats', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: { stat: 1 } });
      const result = await api.getDashboardStats();
      expect(result.stat).toBe(1);
    });
  });

  describe('uploadDocument', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const onProgress = vi.fn();
      const result = await api.uploadDocument(file, 'Title', '1', onProgress);
      expect(result.sucesso).toBe(true);
      expect(mockApi.post).toHaveBeenCalledWith('/api/documents', expect.any(FormData), {
        onUploadProgress: onProgress,
      });
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const result = await api.uploadDocument(file, 'Title', '1');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('requestPasswordRecovery', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const result = await api.requestPasswordRecovery('test@test.com');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.requestPasswordRecovery('test@test.com');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('verifyRecoveryCode', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const result = await api.verifyRecoveryCode('test@test.com', '123456');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.verifyRecoveryCode('test@test.com', '123456');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('resetPassword', () => {
    it('handles success', async () => {
      mockApi.post.mockResolvedValueOnce({ data: {} });
      const result = await api.resetPassword('test@test.com', '123456', 'newpass');
      expect(result.sucesso).toBe(true);
    });

    it('handles error', async () => {
      mockApi.post.mockRejectedValueOnce(new Error());
      const result = await api.resetPassword('test@test.com', '123456', 'newpass');
      expect(result.sucesso).toBe(false);
    });
  });

  describe('getAuditLogs', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: [] });
      const result = await api.getAuditLogs('search', 'action');
      expect(result).toEqual([]);
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const result = await api.getAuditLogs();
      expect(result).toEqual({ content: [], totalPages: 1 });
    });
  });

  describe('exportAuditLogsCSV', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: 'csv data' });
      const createElementMock = vi.spyOn(document, 'createElement');
      const mockAnchor = { href: '', download: '', click: vi.fn() };
      createElementMock.mockReturnValue(mockAnchor as any);

      const appendChildMock = vi.spyOn(document.body, 'appendChild').mockImplementation(vi.fn());
      const removeChildMock = vi.spyOn(document.body, 'removeChild').mockImplementation(vi.fn());

      globalThis.URL.createObjectURL = vi.fn().mockReturnValue('blob:url') as any;
      globalThis.URL.revokeObjectURL = vi.fn() as any;

      await api.exportAuditLogsCSV('search', 'action');

      expect(mockAnchor.click).toHaveBeenCalled();

      createElementMock.mockRestore();
      appendChildMock.mockRestore();
      removeChildMock.mockRestore();
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      await api.exportAuditLogsCSV();
      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
    });
  });

  describe('getComplianceStats', () => {
    it('handles success', async () => {
      mockApi.get.mockResolvedValueOnce({ data: { stat: 1 } });
      const result = await api.getComplianceStats();
      expect(result).toEqual({ stat: 1 });
    });

    it('handles error', async () => {
      mockApi.get.mockRejectedValueOnce(new Error());
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = await api.getComplianceStats();
      expect(result).toBeNull();
      consoleError.mockRestore();
    });
  });

  describe('Interceptors', () => {
    it('request interceptor adds a request ID and calls showLoader', () => {
      localStorage.setItem('token', 'my-token');
      const config = { headers: {} as Record<string, string> };
      const newConfig = requestInterceptor(config);

      expect(newConfig.headers['X-Request-ID']).toBeDefined();
    });

    it('request interceptor triggers loader after timeout', () => {
      for (let i = 0; i < 5; i++) responseInterceptorResolve({ status: 200 }); // reset activeRequests
      vi.useFakeTimers();
      const config = { headers: {} as Record<string, string> };

      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');

      requestInterceptor(config);

      vi.advanceTimersByTime(501);

      expect(dispatchEventSpy).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('response interceptor resolves correctly', () => {
      const response = { status: 200 };
      expect(responseInterceptorResolve(response)).toBe(response);
    });

    it('response interceptor rejects with 401 redirects to login', async () => {
      const error = { response: { status: 401 }, config: { url: '/api/documents' } };

      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
      });

      await expect(responseInterceptorReject(error)).rejects.toBe(error);
      expect(window.location.href).toBe('/login?session_expired=true');

      Object.defineProperty(window, 'location', { value: originalLocation, writable: true });
    });

    it('response interceptor rejects with 401 on login route does NOT redirect', async () => {
      const error = { response: { status: 401 }, config: { url: '/api/auth/login' } };

      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
      });

      await expect(responseInterceptorReject(error)).rejects.toBe(error);
      expect(window.location.href).toBe('');

      Object.defineProperty(window, 'location', { value: originalLocation, writable: true });
    });
  });
});
