
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../../context/authContext';
import Login from '../login';
import * as api from '../../services/api';

vi.mock('../../context/authContext', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

vi.mock('../../services/api', () => ({
  verify2FaLogin: vi.fn(),
}));

const queryClient = new QueryClient();

const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe('Login Page', () => {
  let mockHandleLogin;

  beforeEach(() => {
    vi.clearAllMocks();
    mockHandleLogin = vi.fn();
    useAuth.mockReturnValue({
      handleLogin: mockHandleLogin,
    });
    // clear URL search params
    window.history.pushState({}, 'Test', '/');
  });

  it('renders login form correctly', () => {
    render(<Login />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText('seu.nome@universidade.br')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText(/Continuar/i)).toBeInTheDocument();
  });

  it('updates email and password fields on typing', () => {
    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passwordInput = screen.getByPlaceholderText('••••••••');

    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@edu.br');
    expect(passwordInput.value).toBe('password123');
  });

  it('toggles password visibility', () => {
    render(<Login />, { wrapper: Wrapper });
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const toggleButton = screen.getByRole('button', { name: /Mostrar senha/i });

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('submits the form successfully and navigates', async () => {
    mockHandleLogin.mockResolvedValueOnce({ sucesso: true, dados: {} });

    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);

    expect(mockHandleLogin).toHaveBeenCalledWith('test@edu.br', 'password123');
  });

  it('submits and shows mfa step, then submits 2fa successfully', async () => {
    mockHandleLogin.mockResolvedValueOnce({ sucesso: true, dados: { mfaRequired: true } });
    api.verify2FaLogin.mockResolvedValueOnce({ sucesso: true });

    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    const totpInput = await screen.findByPlaceholderText('000000');
    expect(totpInput).toBeInTheDocument();

    fireEvent.change(totpInput, { target: { value: '123456' } });
    const verifyButton = screen.getByRole('button', { name: /Verificar e Entrar/i });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(api.verify2FaLogin).toHaveBeenCalledWith('test@edu.br', 'password123', '123456');
    });
  });

  it('submits 2fa and shows error', async () => {
    mockHandleLogin.mockResolvedValueOnce({ sucesso: true, dados: { mfaRequired: true } });
    api.verify2FaLogin.mockResolvedValueOnce({ sucesso: false, mensagem: 'Invalid 2FA code' });

    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    const totpInput = await screen.findByPlaceholderText('000000');
    fireEvent.change(totpInput, { target: { value: '123456' } });
    const verifyButton = screen.getByRole('button', { name: /Verificar e Entrar/i });
    fireEvent.click(verifyButton);

    const errorMsg = await screen.findByText(/Invalid 2FA code/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('submits form and shows error from API', async () => {
    mockHandleLogin.mockResolvedValueOnce({ sucesso: false, mensagem: 'Invalid credentials' });

    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    const errorMsg = await screen.findByText(/Invalid credentials/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('handles throw error in handleLogin', async () => {
    mockHandleLogin.mockRejectedValueOnce(new Error('Network error'));

    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    const errorMsg = await screen.findByText(/Network error/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('shows session expired error when query param is present', () => {
    window.history.pushState({}, 'Test', '/?session_expired=true');
    render(<Login />, { wrapper: Wrapper });
    expect(screen.getByText(/Sua sessão expirou/i)).toBeInTheDocument();
  });
});
