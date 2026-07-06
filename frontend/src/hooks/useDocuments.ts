import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDocuments, uploadDocument, getDownloadUrl } from '../services/api';

export const useDocuments = (projectId?: string, title?: string, page = 0, size = 20) => {
  return useQuery({
    queryKey: ['documents', projectId, title, page, size],
    queryFn: async () => {
      const res = await getDocuments(projectId, title, undefined, page, size);
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
