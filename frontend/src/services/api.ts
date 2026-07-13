import axios, { InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, User, Document } from '../types';

const BASE_URL = import.meta.env?.VITE_API_URL ?? '';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let activeRequests = 0;
let loaderTimeout: number | null = null;

const showLoader = () => {
  activeRequests++;
  if (activeRequests === 1) {
    loaderTimeout = window.setTimeout(() => {
      window.dispatchEvent(new Event('showLoader'));
    }, 500); // Show loader only if request takes more than 500ms
  }
};

const hideLoader = () => {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) {
    if (loaderTimeout !== null) {
      window.clearTimeout(loaderTimeout);
      loaderTimeout = null;
    }
    window.dispatchEvent(new Event('hideLoader'));
  }
};

const generateRequestId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Interceptor para adicionar o X-Request-ID e mostrar o loader
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  showLoader();
  config.headers['X-Request-ID'] = generateRequestId();
  return config;
});

// Interceptor para tratamento de sessão expirada (401) e esconder o loader
api.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    if (error.response && error.response.status === 401) {
      // Ignorar redirect no próprio login e no endpoint de checagem de sessão
      if (
        !error.config.url.includes('/api/auth/login') &&
        !error.config.url.includes('/api/auth/me')
      ) {
        window.location.href = '/login?session_expired=true';
      }
    }
    return Promise.reject(error);
  },
);

// Utilitário padrão para tratamento de erros
const handleApiError = <T = any>(error: any, defaultMessage: string): ApiResponse<T> => {
  const message = error.response?.data?.message || error.message || defaultMessage;
  return { sucesso: false, mensagem: message };
};

export const login = async (email: string, senha: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post('/api/auth/login', { email, password: senha });
    if (resposta.status === 202 && resposta.data.mfaRequired) {
      return { sucesso: true, dados: { mfaRequired: true, email: resposta.data.email } };
    }
    return { sucesso: true, dados: resposta.data.user || resposta.data };
  } catch (error) {
    return handleApiError(
      error,
      'Erro ao realizar o login. Verifique seus dados e tente novamente',
    );
  }
};

export const verify2FaLogin = async (email: string, senha: string, code: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post('/api/auth/login/verify-2fa', { email, password: senha, code });
    return { sucesso: true, dados: resposta.data.user || resposta.data };
  } catch (error) {
    return handleApiError(error, 'Código de verificação 2FA inválido.');
  }
};

export const setup2Fa = async (): Promise<ApiResponse<{secret: string, qrCodeUri: string}>> => {
  try {
    const resposta = await api.get('/api/auth/2fa/setup');
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao configurar 2FA.');
  }
};

export const enable2Fa = async (code: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post('/api/auth/2fa/enable', { code });
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Código 2FA inválido.');
  }
};

export const register = async (
  nome: string,
  email: string,
  senha: string,
  role: string,
): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post('/api/auth/register', { name: nome, email, password: senha, role });
    // Token is no longer returned in /register, but /register/verify
    return { sucesso: true, dados: resposta.data.user };
  } catch (error) {
    return handleApiError(
      error,
      'Erro ao realizar o cadastro. Por favor verifique os dados e tente novamente.',
    );
  }
};

export const verifyRegistration = async (
  email: string,
  code: string,
): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post('/api/auth/register/verify', { email, code });
    return { sucesso: true, dados: resposta.data.user || resposta.data };
  } catch (error) {
    return handleApiError(error, 'Código de verificação inválido ou expirado.');
  }
};

export const resendRegistrationCode = async (email: string): Promise<ApiResponse<void>> => {
  try {
    await api.post('/api/auth/register/resend', { email, code: '' });
    return { sucesso: true };
  } catch (error) {
    return handleApiError(error, 'Não foi possível reenviar o código.');
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

export const getProjects = async (page = 0, size = 20): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.get('/api/projects', { params: { page, size } });
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao listar projetos.');
  }
};

export const joinProject = async (projectId: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post(`/api/projects/${projectId}/members`);
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao associar-se ao projeto.');
  }
};

export const getLaboratoryTokens = async (): Promise<ApiResponse<{researcher_token: string; auditor_token: string; expires_in: string}>> => {
  try {
    const resposta = await api.get('/api/v1/laboratory/token');
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao buscar tokens do laboratório.');
  }
};

export const joinLaboratory = async (token: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post('/api/v1/laboratory/join', { token });
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao vincular ao laboratório. Token inválido.');
  }
};

export const getDocuments = async (
  projectId?: string,
  title?: string,
  status?: string,
  page = 0,
  size = 20,
): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.get('/api/documents', {
      params: { projectId, title, status, page, size },
    });
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao listar documentos.');
  }
};

export const reviewDocument = async (
  documentId: string,
  status: 'APPROVED' | 'REJECTED',
  feedback?: string,
): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.patch(`/api/documents/${documentId}/status`, {
      status,
      feedback,
    });
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao atualizar o status do documento.');
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

export const toggleStar = async (documentId: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.patch(`/api/documents/${documentId}/star`);
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao favoritar o documento.');
  }
};

export const getComments = async (documentId: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.get(`/api/documents/${documentId}/comments`);
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao carregar comentários.');
  }
};

export const addComment = async (documentId: string, content: string): Promise<ApiResponse<any>> => {
  try {
    const resposta = await api.post(`/api/documents/${documentId}/comments`, { content });
    return { sucesso: true, dados: resposta.data };
  } catch (error) {
    return handleApiError(error, 'Erro ao adicionar comentário.');
  }
};

export const getDashboardStats = async (): Promise<any> => {
  const response = await api.get('/api/dashboard/stats');
  return response.data;
};

export const uploadDocument = async (
  file: File,
  title: string,
  projectId: string,
  onUploadProgress?: (progressEvent: any) => void,
): Promise<ApiResponse<Document>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('projectId', projectId);

    // O axios já configura automaticamente o Content-Type para multipart/form-data quando recebe um FormData
    const resposta = await api.post('/api/documents', formData, {
      onUploadProgress: onUploadProgress,
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

export const verifyRecoveryCode = async (
  email: string,
  code: string,
): Promise<ApiResponse<any>> => {
  try {
    await api.post('/api/auth/recovery/verify', { email, code });
    return { sucesso: true, mensagem: 'Código verificado com sucesso.' };
  } catch (error) {
    return handleApiError(error, 'Código inválido ou expirado.');
  }
};

export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string,
): Promise<ApiResponse<any>> => {
  try {
    await api.post('/api/auth/recovery/reset', { email, code, newPassword });
    return { sucesso: true, mensagem: 'Senha alterada com sucesso.' };
  } catch (error) {
    return handleApiError(error, 'Erro ao redefinir senha.');
  }
};

export const getAuditLogs = async (
  search?: string,
  action?: string,
  startDate?: string,
  endDate?: string,
  page = 0,
  size = 20,
): Promise<any> => {
  try {
    const params: any = { page, size };
    if (search) params.search = search;
    if (action) params.action = action;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get('/api/audit-logs', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar logs de auditoria:', error);
    return { content: [], totalPages: 1 };
  }
};

export const exportAuditLogsCSV = async (
  search?: string,
  action?: string,
  startDate?: string,
  endDate?: string,
): Promise<void> => {
  try {
    const params: any = {};
    if (search) params.search = search;
    if (action) params.action = action;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get('/api/audit-logs/export', {
      params,
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_logs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar logs de auditoria:', error);
  }
};

export const exportDocumentAuditTrail = async (
  documentId: string,
  format: 'csv' | 'pdf' = 'pdf',
): Promise<void> => {
  try {
    const response = await api.get(`/api/documents/${documentId}/audit/export`, {
      params: { format },
      responseType: 'blob',
    });
    
    const mimeType = format === 'pdf' ? 'application/pdf' : 'text/csv';
    const extension = format;
    
    const blob = new Blob([response.data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_trail_${documentId}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Erro ao exportar trilha de auditoria do documento ${documentId}:`, error);
  }
};

export const getComplianceStats = async (): Promise<any> => {
  try {
    const response = await api.get('/api/dashboard/compliance');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas de compliance:', error);
    return null;
  }
};
