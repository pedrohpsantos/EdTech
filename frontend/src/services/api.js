import axios from 'axios';

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
api.interceptors.request.use((config) => {
    if (config.method !== 'get') {
        config.headers['X-XSRF-TOKEN'] = getCsrfToken();
    }
    return config;
});

// Utilitário padrão para tratamento de erros
const handleApiError = (error, defaultMessage) => {
    const message = error.response?.data?.message || error.message || defaultMessage;
    return { sucesso: false, mensagem: message };
};

export const login = async (email, senha) => {
    try {
        const resposta = await api.post('/api/auth/login', { email, password: senha });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao realizar o login. Verifique seus dados e tente novamente');
    }
};

export const register = async (nome, email, senha) => {
    try {
        const resposta = await api.post('/api/auth/register', { name: nome, email, password: senha });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao realizar o cadastro. Por favor verifique os dados e tente novamente.');
    }
};

export const logout = async () => {
    try {
        await api.post('/api/auth/logout');
        return { sucesso: true };
    } catch (error) {
        return handleApiError(error, 'Falha ao encerrar sessão');
    }
};

export const getMe = async () => {
    try {
        const resposta = await api.get('/api/auth/me');
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Usuário não logado.');
    }
};

export const getProjects = async () => {
    try {
        const resposta = await api.get('/api/projects');
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao listar projetos.');
    }
};

export const getDocuments = async (projectId, title) => {
    try {
        const resposta = await api.get('/api/documents', {
            params: { projectId, title }
        });
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao listar documentos.');
    }
};

export const uploadDocument = async (file, title, projectId) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('projectId', projectId);

        // O axios já configura automaticamente o Content-Type para multipart/form-data quando recebe um FormData
        const resposta = await api.post('/api/documents', formData);
        return { sucesso: true, dados: resposta.data };
    } catch (error) {
        return handleApiError(error, 'Erro ao fazer upload do documento.');
    }
};