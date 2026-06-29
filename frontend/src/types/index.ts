export interface User {
  id: string;
  name: string;
  email: string;
  roles?: string[];
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
}

export interface ApiResponse<T> {
  sucesso: boolean;
  dados?: T;
  mensagem?: string;
}
