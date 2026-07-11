// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthProvider, { useAuth } from './authContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from '../services/api';

vi.mock('../services/api', () => ({
  getMe: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
}));

const TestComponent = () => {
  const { isAuthenticated, isLoading, user, handleLogin, handleLogout, handleRegister } = useAuth();
  if (isLoading) return <span data-testid="auth-status">Carregando</span>;
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'Logado' : 'Deslogado'}</span>
      <span data-testid="user-name">{user?.nome || 'Anon'}</span>
      <button data-testid="btn-login" onClick={() => handleLogin('test@test.com', '123')}>
        Login
      </button>
      <button data-testid="btn-logout" onClick={() => handleLogout()}>
        Logout
      </button>
      <button
        data-testid="btn-register"
        onClick={() =>
          handleRegister({ nome: 'Test', email: 'test@test.com', senha: '123', telefone: '123' })
        }
      >
        Register
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve inicializar como Deslogado se getMe retornar erro', async () => {
    getMe.mockResolvedValueOnce({ sucesso: false });
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado');
    });
  });

  it('deve inicializar como Logado se getMe retornar sucesso', async () => {
    getMe.mockResolvedValueOnce({ sucesso: true, dados: { nome: 'João' } });
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Logado');
      expect(screen.getByTestId('user-name')).toHaveTextContent('João');
    });
  });

  it('deve realizar login com sucesso', async () => {
    getMe.mockResolvedValueOnce({ sucesso: false });
    apiLogin.mockResolvedValueOnce({ sucesso: true, dados: { nome: 'Maria' } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado'));

    fireEvent.click(screen.getByTestId('btn-login'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Logado');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Maria');
    });
  });

  it('deve realizar logout com sucesso', async () => {
    getMe.mockResolvedValueOnce({ sucesso: true, dados: { nome: 'Carlos' } });
    apiLogout.mockResolvedValueOnce({ sucesso: true });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('auth-status')).toHaveTextContent('Logado'));

    fireEvent.click(screen.getByTestId('btn-logout'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado');
    });
  });

  it('deve realizar register com sucesso', async () => {
    getMe.mockResolvedValueOnce({ sucesso: false });
    // NOTE: handleRegister only returns the response, it doesn't set the user automatically in the hook.
    // Wait, looking at handleRegister in authContext.tsx:
    // const handleRegister = async (nome, email, senha) => { return await register(nome, email, senha) }
    // It does NOT set the user. So auth-status will still be Deslogado!
    apiRegister.mockResolvedValueOnce({ sucesso: true, dados: { nome: 'NovoUser' } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado'));

    fireEvent.click(screen.getByTestId('btn-register'));

    // Since it doesn't log the user in, we just assert the API was called.
    await waitFor(() => {
      expect(apiRegister).toHaveBeenCalled();
    });
  });
});
