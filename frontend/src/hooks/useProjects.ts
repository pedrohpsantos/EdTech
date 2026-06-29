import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/api';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await getProjects();
            if (!res.sucesso) throw new Error(res.mensagem);
            return res.dados || [];
        },
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};
