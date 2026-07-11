// @ts-nocheck
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  mfaEnabled?: boolean;
}
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
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