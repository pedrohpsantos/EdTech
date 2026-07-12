import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDocuments, uploadDocument, getDownloadUrl, toggleStar, getComments, addComment } from '../services/api';

export const useDocuments = (projectId?: string, title?: string, status?: string, page = 0, size = 20) => {
  return useQuery({
    queryKey: ['documents', projectId, title, status, page, size],
    queryFn: async () => {
      const res = await getDocuments(projectId, title, status, page, size);
      if (!res.sucesso) throw new Error(res.mensagem);
      return res.dados?.content || res.dados || [];
    },
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      title,
      projectId,
      onProgress,
    }: {
      file: File;
      title: string;
      projectId: string;
      onProgress?: (p: any) => void;
    }) => {
      const res = await uploadDocument(file, title, projectId, onProgress);
      if (!res.sucesso) throw new Error(res.mensagem);
      return res.dados;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const useDownloadUrl = () => {
  return useMutation({
    mutationFn: async (documentId: string) => {
      const res = await getDownloadUrl(documentId);
      if (!res.sucesso) throw new Error(res.mensagem);
      return typeof res.dados === 'string'
        ? res.dados
        : res.dados?.url || res.dados?.downloadUrl || res.dados?.fileUrl;
    },
  });
};

export const useToggleStar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const res = await toggleStar(documentId);
      if (!res.sucesso) throw new Error(res.mensagem);
      return res.dados;
    },
    // Optimistic UI Update
    onMutate: async (documentId) => {
      await queryClient.cancelQueries({ queryKey: ['documents'] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ['documents'] });
      
      queryClient.setQueriesData({ queryKey: ['documents'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((doc: any) => 
          doc.id === documentId ? { ...doc, starred: !doc.starred } : doc
        );
      });
      return { previousQueries };
    },
    onError: (err, documentId, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const useComments = (documentId?: string) => {
  return useQuery({
    queryKey: ['comments', documentId],
    queryFn: async () => {
      if (!documentId) return [];
      const res = await getComments(documentId);
      if (!res.sucesso) throw new Error(res.mensagem);
      return res.dados;
    },
    enabled: !!documentId,
  });
};

export const useAddComment = (documentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await addComment(documentId, content);
      if (!res.sucesso) throw new Error(res.mensagem);
      return res.dados;
    },
    onMutate: async (newContent) => {
      await queryClient.cancelQueries({ queryKey: ['comments', documentId] });
      const previousComments = queryClient.getQueryData(['comments', documentId]);

      queryClient.setQueryData(['comments', documentId], (old: any) => [
        ...(old || []),
        {
          id: Math.random().toString(), // fake id for optimistic UI
          content: newContent,
          createdAt: new Date().toISOString(),
          authorName: 'Você', // optimistically assumed
        },
      ]);
      return { previousComments };
    },
    onError: (err, newContent, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', documentId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', documentId] });
    },
  });
};
