import { renderHook, waitFor } from '@testing-library/react';
import { useDocuments, useUploadDocument, useDownloadUrl, useToggleStar, useComments, useAddComment } from '../useDocuments';
import * as api from '../../services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../services/api', () => ({
  getDocuments: vi.fn(),
  uploadDocument: vi.fn(),
  getDownloadUrl: vi.fn(),
  toggleStar: vi.fn(),
  getComments: vi.fn(),
  addComment: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useDocuments hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useDocuments', () => {
    it('should successfully fetch documents with content', async () => {
      vi.mocked(api.getDocuments).mockResolvedValueOnce({ sucesso: true, dados: { content: ['doc1'] } });
      const { result } = renderHook(() => useDocuments(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(['doc1']);
    });

    it('should successfully fetch documents with plain dados', async () => {
      vi.mocked(api.getDocuments).mockResolvedValueOnce({ sucesso: true, dados: ['doc2'] });
      const { result } = renderHook(() => useDocuments(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(['doc2']);
    });

    it('should fallback to empty array if no dados', async () => {
      vi.mocked(api.getDocuments).mockResolvedValueOnce({ sucesso: true });
      const { result } = renderHook(() => useDocuments(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual([]);
    });

    it('should throw error when fetching fails', async () => {
      vi.mocked(api.getDocuments).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useDocuments(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });
  });

  describe('useUploadDocument', () => {
    it('should successfully upload document', async () => {
      vi.mocked(api.uploadDocument).mockResolvedValueOnce({ sucesso: true, dados: { id: '1', title: 'Test', status: 'Aprovado', createdAt: '2023-01-01' } as any });
      const { result } = renderHook(() => useUploadDocument(), { wrapper: createWrapper() });
      
      const file = new File([''], 'test.pdf');
      result.current.mutate({ file, title: 'Test', projectId: '1' });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.id).toBe('1');
    });

    it('should throw error when upload fails', async () => {
      vi.mocked(api.uploadDocument).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useUploadDocument(), { wrapper: createWrapper() });
      
      const file = new File([''], 'test.pdf');
      result.current.mutate({ file, title: 'Test', projectId: '1' });
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });
  });

  describe('useDownloadUrl', () => {
    it('should successfully get string url', async () => {
      vi.mocked(api.getDownloadUrl).mockResolvedValueOnce({ sucesso: true, dados: 'http://test.com' });
      const { result } = renderHook(() => useDownloadUrl(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('http://test.com');
    });

    it('should successfully get url from object (url property)', async () => {
      vi.mocked(api.getDownloadUrl).mockResolvedValueOnce({ sucesso: true, dados: { url: 'http://test2.com' } });
      const { result } = renderHook(() => useDownloadUrl(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('http://test2.com');
    });

    it('should successfully get url from object (downloadUrl property)', async () => {
      vi.mocked(api.getDownloadUrl).mockResolvedValueOnce({ sucesso: true, dados: { downloadUrl: 'http://test3.com' } });
      const { result } = renderHook(() => useDownloadUrl(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('http://test3.com');
    });

    it('should successfully get url from object (fileUrl property)', async () => {
      vi.mocked(api.getDownloadUrl).mockResolvedValueOnce({ sucesso: true, dados: { fileUrl: 'http://test4.com' } });
      const { result } = renderHook(() => useDownloadUrl(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('http://test4.com');
    });

    it('should throw error when get url fails', async () => {
      vi.mocked(api.getDownloadUrl).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useDownloadUrl(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });
  });

  describe('useToggleStar', () => {
    it('should successfully toggle star', async () => {
      vi.mocked(api.toggleStar).mockResolvedValueOnce({ sucesso: true, dados: 'ok' });
      const { result } = renderHook(() => useToggleStar(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('ok');
    });

    it('should handle optimistic update error rollback correctly', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      queryClient.setQueryData(['documents'], [{ id: 'doc1', starred: false }]);
      vi.mocked(api.toggleStar).mockRejectedValueOnce(new Error('Network error'));
      
      const { result } = renderHook(() => useToggleStar(), { wrapper });
      result.current.mutate('doc1');
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(queryClient.getQueryData(['documents'])).toEqual([{ id: 'doc1', starred: false }]);
    });

    it('should handle optimistic update rollback correctly without previous data', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      vi.mocked(api.toggleStar).mockRejectedValueOnce(new Error('Network error'));
      
      const { result } = renderHook(() => useToggleStar(), { wrapper });
      result.current.mutate('doc1');
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(queryClient.getQueryData(['documents'])).toBeUndefined();
    });

    it('should update queryData correctly onMutate and handle unmatching doc ids', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      queryClient.setQueryData(['documents'], [{ id: 'doc1', starred: false }, { id: 'doc2', starred: false }]);
      vi.mocked(api.toggleStar).mockResolvedValueOnce({ sucesso: true });
      
      const { result } = renderHook(() => useToggleStar(), { wrapper });
      result.current.mutate('doc1');
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      
      const data = queryClient.getQueryData(['documents']) as any[];
      expect(data[0].starred).toBe(true);
      expect(data[1].starred).toBe(false); // Unmatched id remains unchanged
    });

    it('should handle optimistic update when oldData is falsy (null)', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      // Explicitly set it to null so the query exists and the updater is called
      queryClient.setQueryData(['documents'], null);
      vi.mocked(api.toggleStar).mockResolvedValueOnce({ sucesso: true });
      
      const { result } = renderHook(() => useToggleStar(), { wrapper });
      result.current.mutate('doc1');
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(queryClient.getQueryData(['documents'])).toBeNull(); 
    });

    it('should handle onError when context is undefined due to onMutate error', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      // We will override queryClient.cancelQueries to throw an error
      const mockCancel = vi.fn().mockRejectedValue(new Error('Cancel error'));
      queryClient.cancelQueries = mockCancel;
      
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      const { result } = renderHook(() => useToggleStar(), { wrapper });
      result.current.mutate('doc1');
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Cancel error');
    });

    it('should throw error when toggle fails', async () => {
      vi.mocked(api.toggleStar).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useToggleStar(), { wrapper: createWrapper() });
      result.current.mutate('doc1');
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });
  });

  describe('useComments', () => {
    it('should successfully get comments when documentId provided', async () => {
      vi.mocked(api.getComments).mockResolvedValueOnce({ sucesso: true, dados: ['comm1'] });
      const { result } = renderHook(() => useComments('doc1'), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(['comm1']);
    });

    it('should return empty array if documentId not provided (though disabled)', async () => {
      const { result } = renderHook(() => useComments(), { wrapper: createWrapper() });
      // Since it's not enabled, we expect it to be pending/idle
      expect(result.current.fetchStatus).toBe('idle');
      // For coverage of the first line inside queryFn: if (!documentId) return [];
      // We can trigger it by refetching manually
      const res = await result.current.refetch();
      expect(res.data).toEqual([]);
    });

    it('should throw error when get comments fails', async () => {
      vi.mocked(api.getComments).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useComments('doc1'), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });
  });

  describe('useAddComment', () => {
    it('should successfully add comment', async () => {
      vi.mocked(api.addComment).mockResolvedValueOnce({ sucesso: true, dados: 'ok' });
      const { result } = renderHook(() => useAddComment('doc1'), { wrapper: createWrapper() });
      result.current.mutate('new comment');
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('ok');
    });

    it('should throw error when add comment fails', async () => {
      vi.mocked(api.addComment).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error' });
      const { result } = renderHook(() => useAddComment('doc1'), { wrapper: createWrapper() });
      result.current.mutate('new comment');
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe('Error');
    });

    it('should handle optimistic update error rollback correctly', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      queryClient.setQueryData(['comments', 'doc1'], [{ id: '1', content: 'c' }]);
      vi.mocked(api.addComment).mockRejectedValueOnce(new Error('Network error'));
      
      const { result } = renderHook(() => useAddComment('doc1'), { wrapper });
      result.current.mutate('new comment');
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(queryClient.getQueryData(['comments', 'doc1'])).toEqual([{ id: '1', content: 'c' }]);
    });

    it('should handle optimistic update rollback correctly without previous data', async () => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
      const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      
      vi.mocked(api.addComment).mockRejectedValueOnce(new Error('Network error'));
      
      const { result } = renderHook(() => useAddComment('doc1'), { wrapper });
      result.current.mutate('new comment');
      
      await waitFor(() => expect(result.current.isError).toBe(true));
      
      const data = queryClient.getQueryData(['comments', 'doc1']) as any[];
      expect(data).toHaveLength(1);
      expect(data[0].content).toBe('new comment');
    });
  });
});
