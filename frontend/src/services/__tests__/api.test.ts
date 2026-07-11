import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as apiModule from '../api';
import axios from 'axios';

// We will store the interceptor handlers here using vi.hoisted so they are available inside vi.mock
const { requestHandlers, responseHandlers } = vi.hoisted(() => {
  return {
    requestHandlers: [] as any[],
    responseHandlers: [] as any[]
  };
});

export const requestInterceptorHandlers = requestHandlers;
export const responseInterceptorHandlers = responseHandlers;

// Mock the axios module
vi.mock('axios', () => {
  const mAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn((success, error) => {
          requestHandlers.push({ success, error });
        }),
        eject: vi.fn()
      },
      response: {
        use: vi.fn((success, error) => {
          responseHandlers.push({ success, error });
        }),
        eject: vi.fn()
      }
    }
  };
  return {
    default: {
      create: vi.fn(() => mAxiosInstance)
    }
  };
});

// Since the module creates the instance immediately, we need to get access to it
const mAxios = axios.create();

describe('api service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('returns success and saves token', async () => {
      const mockUser = { id: 1, name: 'Test' };
      (mAxios.post as any).mockResolvedValueOnce({ data: { token: 'mockToken', user: mockUser } });
      
      const result = await apiModule.login('test@test.com', 'password');
      expect(result.sucesso).toBe(true);
      expect(result.dados).toEqual(mockUser);
      expect(localStorage.getItem('token')).toBe('mockToken');
    });

    it('handles errors', async () => {
      const error = { response: { data: { message: 'Invalid credentials' } } };
      (mAxios.post as any).mockRejectedValueOnce(error);
      
      const result = await apiModule.login('test@test.com', 'wrong');
      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Invalid credentials');
    });
  });

  describe('register', () => {
    it('returns success', async () => {
      const mockUser = { id: 1, name: 'New User' };
      (mAxios.post as any).mockResolvedValueOnce({ data: { user: mockUser } });
      
      const result = await apiModule.register('New User', 'test@test.com', 'password', 'RESEARCHER');
      expect(result.sucesso).toBe(true);
      expect(result.dados).toEqual(mockUser);
    });

    it('handles errors', async () => {
      const error = { message: 'Network error' };
      (mAxios.post as any).mockRejectedValueOnce(error);
      
      const result = await apiModule.register('User', 'test@test.com', 'pass', 'RESEARCHER');
      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Network error');
    });
  });

  describe('logout', () => {
    it('clears token on success', async () => {
      localStorage.setItem('token', 'someToken');
      (mAxios.post as any).mockResolvedValueOnce({});
      
      const result = await apiModule.logout();
      expect(result.sucesso).toBe(true);
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('clears token even on error', async () => {
      localStorage.setItem('token', 'someToken');
      (mAxios.post as any).mockRejectedValueOnce(new Error('Logout failed'));
      
      const result = await apiModule.logout();
      expect(result.sucesso).toBe(false);
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('getMe', () => {
    it('returns user data on success', async () => {
      const mockUser = { id: 1, email: 'test@edu.br' };
      (mAxios.get as any).mockResolvedValueOnce({ data: mockUser });
      
      const result = await apiModule.getMe();
      expect(result.sucesso).toBe(true);
      expect(result.dados).toEqual(mockUser);
    });

    it('returns error when not logged in', async () => {
      (mAxios.get as any).mockRejectedValueOnce(new Error('Not logged in'));
      const result = await apiModule.getMe();
      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Not logged in');
    });
  });

  describe('getProjects', () => {
    it('returns projects on success', async () => {
      const mockProjects = [{ id: 1, title: 'Project 1' }];
      (mAxios.get as any).mockResolvedValueOnce({ data: mockProjects });
      
      const result = await apiModule.getProjects();
      expect(result.sucesso).toBe(true);
      expect(result.dados).toEqual(mockProjects);
    });

    it('returns error on failure', async () => {
      (mAxios.get as any).mockRejectedValueOnce(new Error('API error'));
      const result = await apiModule.getProjects();
      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('API error');
    });
  });

  describe('joinProject', () => {
    it('returns success on joining', async () => {
      (mAxios.post as any).mockResolvedValueOnce({ data: { status: 'joined' } });
      const result = await apiModule.joinProject('123');
      expect(result.sucesso).toBe(true);
      expect(result.dados).toEqual({ status: 'joined' });
    });
  });

  describe('getDocuments', () => {
    it('returns documents', async () => {
      (mAxios.get as any).mockResolvedValueOnce({ data: { content: [] } });
      const result = await apiModule.getDocuments('123', 'doc', 'APPROVED', 0, 10);
      expect(result.sucesso).toBe(true);
      expect(mAxios.get).toHaveBeenCalledWith('/api/documents', {
        params: { projectId: '123', title: 'doc', status: 'APPROVED', page: 0, size: 10 }
      });
    });
  });

  describe('reviewDocument', () => {
    it('returns success', async () => {
      (mAxios.patch as any).mockResolvedValueOnce({ data: { status: 'APPROVED' } });
      const result = await apiModule.reviewDocument('doc1', 'APPROVED', 'good');
      expect(result.sucesso).toBe(true);
      expect(mAxios.patch).toHaveBeenCalledWith('/api/documents/doc1/status', { status: 'APPROVED', feedback: 'good' });
    });
  });

  describe('getDownloadUrl', () => {
    it('returns url', async () => {
      (mAxios.get as any).mockResolvedValueOnce({ data: { url: 'http://url' } });
      const result = await apiModule.getDownloadUrl('doc1');
      expect(result.sucesso).toBe(true);
    });
  });

  describe('getDashboardStats', () => {
    it('returns stats', async () => {
      (mAxios.get as any).mockResolvedValueOnce({ data: { total: 10 } });
      const result = await apiModule.getDashboardStats();
      expect(result).toEqual({ total: 10 });
    });
  });

  describe('uploadDocument', () => {
    it('returns success', async () => {
      (mAxios.post as any).mockResolvedValueOnce({ data: { id: 'doc1' } });
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      const result = await apiModule.uploadDocument(file, 'Title', 'proj1', vi.fn());
      expect(result.sucesso).toBe(true);
      expect(mAxios.post).toHaveBeenCalled();
      const formDataArg = (mAxios.post as any).mock.calls[0][1];
      expect(formDataArg instanceof FormData).toBe(true);
    });
  });

  describe('Password Recovery', () => {
    it('requestPasswordRecovery', async () => {
      (mAxios.post as any).mockResolvedValueOnce({});
      const result = await apiModule.requestPasswordRecovery('test@test.com');
      expect(result.sucesso).toBe(true);
    });
    
    it('verifyRecoveryCode', async () => {
      (mAxios.post as any).mockResolvedValueOnce({});
      const result = await apiModule.verifyRecoveryCode('test@test.com', '123456');
      expect(result.sucesso).toBe(true);
    });
    
    it('resetPassword', async () => {
      (mAxios.post as any).mockResolvedValueOnce({});
      const result = await apiModule.resetPassword('test@test.com', '123456', 'newPass');
      expect(result.sucesso).toBe(true);
    });
  });

  describe('Audit and Compliance', () => {
    it('getAuditLogs', async () => {
      (mAxios.get as any).mockResolvedValueOnce({ data: [{ id: 1 }] });
      const result = await apiModule.getAuditLogs('search', 'CREATE');
      expect(result).toEqual([{ id: 1 }]);
    });
    
    it('getAuditLogs failure handles error', async () => {
      (mAxios.get as any).mockRejectedValueOnce(new Error('fail'));
      const result = await apiModule.getAuditLogs();
      expect(result).toEqual([]);
    });
    
    it('getComplianceStats', async () => {
      (mAxios.get as any).mockResolvedValueOnce({ data: { compliant: 10 } });
      const result = await apiModule.getComplianceStats();
      expect(result).toEqual({ compliant: 10 });
    });
    
    it('getComplianceStats failure handles error', async () => {
      (mAxios.get as any).mockRejectedValueOnce(new Error('fail'));
      const result = await apiModule.getComplianceStats();
      expect(result).toBeNull();
    });
  });

  describe('Interceptors and default Error Handling', () => {
    it('request interceptor adds token', () => {
      localStorage.setItem('token', 'valid-token');
      const useRequest = requestInterceptorHandlers[0].success;
      const config = { headers: {} as Record<string, string> };
      const newConfig = useRequest(config);
      expect(newConfig.headers['Authorization']).toBe('Bearer valid-token');
    });

    it('response interceptor on success', () => {
      const useResponseSuccess = responseInterceptorHandlers[0].success;
      const response = { data: 'ok' };
      const newResponse = useResponseSuccess(response);
      expect(newResponse).toBe(response);
    });

    it('response interceptor on 401 error redirects to login', async () => {
      const useResponseError = responseInterceptorHandlers[0].error;
      const error = { response: { status: 401 }, config: { url: '/api/some/endpoint' } };
      
      const originalLocation = window.location;
      delete (window as any).location;
      window.location = { href: '' } as any;

      try {
        await useResponseError(error);
      } catch (e) {
        expect(e).toBe(error);
      }
      expect(window.location.href).toBe('/login?session_expired=true');
      
      (window as any).location = originalLocation;
    });
    
    it('response interceptor ignores 401 on login route', async () => {
      const useResponseError = responseInterceptorHandlers[0].error;
      const error = { response: { status: 401 }, config: { url: '/api/auth/login' } };
      
      const originalLocation = window.location;
      delete (window as any).location;
      window.location = { href: '' } as any;

      try {
        await useResponseError(error);
      } catch (e) {
        expect(e).toBe(error);
      }
      expect(window.location.href).toBe(''); // Did not redirect
      
      (window as any).location = originalLocation;
    });
  });
});
