
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/authContext';
import Register from '../register';

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

describe('Register Page', () => {
  it('renders register form correctly', () => {
    render(<Register />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText('ex: Chiquinha Silva')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('seu.nome@universidade.br')).toBeInTheDocument();
    // Register has two password fields: "Senha" and "Confirmar Senha", both use placeholder "••••••••"
    const passFields = screen.getAllByPlaceholderText('••••••••');
    expect(passFields.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Criar Conta')).toBeInTheDocument();
  });

  it('updates input fields on typing', () => {
    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passFields[0];
    const confirmPasswordInput = passFields[1];

    fireEvent.change(nameInput, { target: { value: 'Chiquinha Silva' } });
    fireEvent.change(emailInput, { target: { value: 'chiquinha@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('Chiquinha Silva');
    expect(emailInput.value).toBe('chiquinha@edu.br');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it('toggles password visibility for both password fields', () => {
    render(<Register />, { wrapper: Wrapper });
    const passFields = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passFields[0];
    const confirmPasswordInput = passFields[1];
    
    const togglePassword = screen.getByRole('button', { name: 'Mostrar senha' });
    const toggleConfirm = screen.getByRole('button', { name: 'Mostrar confirmação de senha' });

    expect(passwordInput.type).toBe('password');
    fireEvent.click(togglePassword);
    expect(passwordInput.type).toBe('text');

    expect(confirmPasswordInput.type).toBe('password');
    fireEvent.click(toggleConfirm);
    expect(confirmPasswordInput.type).toBe('text');
  });

  it('submits the register form with mismatching passwords', () => {
    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passFields[0];
    const confirmPasswordInput = passFields[1];
    const submitButton = screen.getByRole('button', { name: /Criar Conta/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pass321' } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/As senhas não coincidem/i)).toBeInTheDocument();
  });
});
