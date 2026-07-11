// @ts-nocheck
import { renderHook, waitFor } from '@testing-library/react';
import { useRequestRecovery, useVerifyRecovery, useResetPassword } from '../useAuth';
import * as api from '../../services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../services/api', () => ({
  requestPasswordRecovery: vi.fn(),
  verifyRecoveryCode: vi.fn(),
  resetPassword: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAuth hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useRequestRecovery', () => {
    it('should successfully request recovery', async () => {
      vi.mocked(api.requestPasswordRecovery).mockResolvedValueOnce({ sucesso: true, dados: 'ok' });
      const { result } = renderHook(() => useRequestRecovery(), { wrapper: createWrapper() });
      
      result.current.mutate('test@test.com');
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({ sucesso: true, dados: 'ok' });
      expect(api.requestPasswordRecovery).toHaveBeenCalledWith('test@test.com');
    });

    it('should throw error when request fails', async () => {
      vi.mocked(api.requestPasswordRecovery).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useRequestRecovery(), { wrapper: createWrapper() });
      
      result.current.mutate('test@test.com');
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });
  });

  describe('useVerifyRecovery', () => {
    it('should successfully verify recovery code', async () => {
      vi.mocked(api.verifyRecoveryCode).mockResolvedValueOnce({ sucesso: true });
      const { result } = renderHook(() => useVerifyRecovery(), { wrapper: createWrapper() });
      
      result.current.mutate({ email: 'test@test.com', code: '123' });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.verifyRecoveryCode).toHaveBeenCalledWith('test@test.com', '123');
    });

    it('should throw error when verify fails', async () => {
      vi.mocked(api.verifyRecoveryCode).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error verify' });
      const { result } = renderHook(() => useVerifyRecovery(), { wrapper: createWrapper() });
      
      result.current.mutate({ email: 'test@test.com', code: '123' });
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error verify');
    });
  });

  describe('useResetPassword', () => {
    it('should successfully reset password', async () => {
      vi.mocked(api.resetPassword).mockResolvedValueOnce({ sucesso: true });
      const { result } = renderHook(() => useResetPassword(), { wrapper: createWrapper() });
      
      result.current.mutate({ email: 'test@test.com', code: '123', newPassword: 'new' });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(api.resetPassword).toHaveBeenCalledWith('test@test.com', '123', 'new');
    });

    it('should throw error when reset fails', async () => {
      vi.mocked(api.resetPassword).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error reset' });
      const { result } = renderHook(() => useResetPassword(), { wrapper: createWrapper() });
      
      result.current.mutate({ email: 'test@test.com', code: '123', newPassword: 'new' });
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error reset');
    });
  });
});
