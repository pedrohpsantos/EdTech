export interface User {
  id: string;
  name: string;
  email: string;
  role: 'RESEARCHER' | 'ADVISOR' | 'AUDITOR' | 'ADMIN';
  mfaEnabled?: boolean;
  institutionId?: string;
  avatarUrl?: string | null;
}

export interface Project {
  id: string;
  name?: string;
  title?: string;
  description: string;
  createdAt?: string;
  member?: boolean;
}

export interface Document {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  downloadUrl?: string;
  project?: string;
  type?: string;
  size?: string;
  modified?: string;
}

export interface ApiResponse<T> {
  sucesso: boolean;
  dados?: T;
  mensagem?: string;
}
