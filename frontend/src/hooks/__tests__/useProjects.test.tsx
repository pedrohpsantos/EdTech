import { renderHook, waitFor } from '@testing-library/react';
import { useProjects } from '../useProjects';
import * as api from '../../services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../services/api', () => ({
  getProjects: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useProjects hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully fetch projects', async () => {
    const mockProjects = [{ id: '1', name: 'Proj' }];
    vi.mocked(api.getProjects).mockResolvedValueOnce({ sucesso: true, dados: mockProjects });
    
    const { result } = renderHook(() => useProjects(), { wrapper: createWrapper() });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockProjects);
  });

  it('should handle undefined dados by returning empty array', async () => {
    vi.mocked(api.getProjects).mockResolvedValueOnce({ sucesso: true });
    
    const { result } = renderHook(() => useProjects(), { wrapper: createWrapper() });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });

  it('should throw error when fetching fails', async () => {
    vi.mocked(api.getProjects).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error fetch' });
    
    const { result } = renderHook(() => useProjects(), { wrapper: createWrapper() });
    
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Error fetch');
  });
});
