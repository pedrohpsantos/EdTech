export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
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
