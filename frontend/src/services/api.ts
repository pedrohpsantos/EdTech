import axios, { InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, User, Project, Document } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

const getCsrfToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
};

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Substitui 'credentials: include'
});

// Interceptor para adicionar o token CSRF em requisições que não sejam GET
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.method !== 'get') {
        config.headers['X-XSRF-TOKEN'] = getCsrfToken();
    }
    return config;
});

// Interceptor para tratamento de sessão expirada (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Ignorar redirect no próprio login e no endpoint de checagem de sessão
            if (!error.config.url.includes('/api/auth/login') && !error.config.url.includes('/api/auth/me')) {
                window.location.href = '/login?session_expired=true';
            }
        }
        return Promise.reject(error);
    }
);

// Utilitário padrão para tratamento de erros
const handleApiError = <T = any>(error: any, defaultMessage: string): ApiResponse<T> => {
    const message = error.response?.data?.message || error.message || defaultMessage;
    return { sucesso: false, mensagem: message };
};

export const login = async (email: string, senha: string): Promise<ApiResponse<any>> => {
    try {
        const resposta = await api.post('/api/auth/login', { email, password: senha });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao realizar o login. Verifique seus dados e tente novamente');
    }
};

export const register = async (nome: string, email: string, senha: string): Promise<ApiResponse<any>> => {
    try {
        const resposta = await api.post('/api/auth/register', { name: nome, email, password: senha });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao realizar o cadastro. Por favor verifique os dados e tente novamente.');
    }
};

export const logout = async (): Promise<ApiResponse<void>> => {
    try {
        await api.post('/api/auth/logout');
        return { sucesso: true };
    } catch (error) {
        return handleApiError(error, 'Falha ao encerrar sessão');
    }
};

export const getMe = async (): Promise<ApiResponse<User>> => {
    try {
        const resposta = await api.get('/api/auth/me');
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Usuário não logado.');
    }
};

export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
    try {
        const resposta = await api.get('/api/projects');
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao listar projetos.');
    }
};

export const getDocuments = async (projectId?: string, title?: string, page = 0, size = 20): Promise<ApiResponse<any>> => {
    try {
        const resposta = await api.get('/api/documents', {
            params: { projectId, title, page, size }
        });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao listar documentos.');
    }
};

export const getDownloadUrl = async (documentId: string): Promise<ApiResponse<any>> => {
    try {
        const resposta = await api.get(`/api/documents/${documentId}/download`);
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao gerar link de download seguro.');
    }
};

export const uploadDocument = async (file: File, title: string, projectId: string, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<Document>> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('projectId', projectId);

        // O axios já configura automaticamente o Content-Type para multipart/form-data quando recebe um FormData
        const resposta = await api.post('/api/documents', formData, {
            onUploadProgress: onUploadProgress
        });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao fazer upload do documento.');
    }
};

export const requestPasswordRecovery = async (email: string): Promise<ApiResponse<any>> => {
    try {
        await api.post('/api/auth/recovery/request', { email });
        return { sucesso: true, mensagem: 'Código enviado para o seu e-mail (se cadastrado).' };
    } catch (error) {
        return handleApiError(error, 'Erro ao solicitar código de recuperação.');
    }
};

export const verifyRecoveryCode = async (email: string, code: string): Promise<ApiResponse<any>> => {
    try {
        await api.post('/api/auth/recovery/verify', { email, code });
        return { sucesso: true, mensagem: 'Código verificado com sucesso.' };
    } catch (error) {
        return handleApiError(error, 'Código inválido ou expirado.');
    }
};

export const resetPassword = async (email: string, code: string, newPassword: string): Promise<ApiResponse<any>> => {
    try {
        await api.post('/api/auth/recovery/reset', { email, code, newPassword });
        return { sucesso: true, mensagem: 'Senha alterada com sucesso.' };
    } catch (error) {
        return handleApiError(error, 'Erro ao redefinir senha.');
    }
};