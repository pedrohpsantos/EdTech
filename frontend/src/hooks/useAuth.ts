import { useMutation } from '@tanstack/react-query';
import { requestPasswordRecovery, verifyRecoveryCode, resetPassword } from '../services/api';

export const useRequestRecovery = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const res = await requestPasswordRecovery(email);
            if (!res.sucesso) throw new Error(res.mensagem);
            return res;
        }
    });
};

export const useVerifyRecovery = () => {
    return useMutation({
        mutationFn: async ({ email, code }: { email: string, code: string }) => {
            const res = await verifyRecoveryCode(email, code);
            if (!res.sucesso) throw new Error(res.mensagem);
            return res;
        }
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async ({ email, code, newPassword }: { email: string, code: string, newPassword: string }) => {
            const res = await resetPassword(email, code, newPassword);
            if (!res.sucesso) throw new Error(res.mensagem);
            return res;
        }
    });
};
