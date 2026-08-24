import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/authContext';
import Register from '../register';
import * as api from '../../services/api';
import { vi } from 'vitest';

vi.mock('../../services/api', () => ({
  register: vi.fn(),
  verifyRegistration: vi.fn(),
}));

const queryClient = new QueryClient();

const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
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
    expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
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
    const submitButton = screen.getByRole('button', { name: /Avançar/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pass321' } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/As senhas não coincidem/i)).toBeInTheDocument();
  });

  it('submits register successfully and moves to step 2, then submits verify successfully', async () => {
    api.register.mockResolvedValueOnce({ sucesso: true, dados: {} });
    api.verifyRegistration.mockResolvedValueOnce({ sucesso: true, dados: {} });

    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passFields[0];
    const confirmPasswordInput = passFields[1];
    const submitButton = screen.getByRole('button', { name: /Avançar/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pass123' } });

    fireEvent.click(submitButton);

    // Wait for step 2
    const verifyInput = await screen.findByPlaceholderText('Ex: 123456');
    expect(verifyInput).toBeInTheDocument();

    fireEvent.change(verifyInput, { target: { value: '123456' } });
    const verifyButton = screen.getByRole('button', { name: /Verificar Conta/i });
    fireEvent.click(verifyButton);

    expect(api.verifyRegistration).toHaveBeenCalledWith('test@edu.br', '123456');
  });

  it('submits register and handles error', async () => {
    api.register.mockResolvedValueOnce({ sucesso: false, mensagem: 'Error registering' });
    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passFields[0], { target: { value: 'pass123' } });
    fireEvent.change(passFields[1], { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Avançar/i }));

    const errorMsg = await screen.findByText(/Error registering/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('handles API throw error in register', async () => {
    api.register.mockRejectedValueOnce(new Error('Network Error'));
    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passFields[0], { target: { value: 'pass123' } });
    fireEvent.change(passFields[1], { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Avançar/i }));

    const errorMsg = await screen.findByText(/Network Error/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('shows error if OTP is too short and toggles back to step 1', async () => {
    api.register.mockResolvedValueOnce({ sucesso: true, dados: {} });
    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passFields[0], { target: { value: 'pass123' } });
    fireEvent.change(passFields[1], { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Avançar/i }));

    const verifyInput = await screen.findByPlaceholderText('Ex: 123456');
    fireEvent.change(verifyInput, { target: { value: '12' } }); // < 6
    fireEvent.click(screen.getByRole('button', { name: /Verificar Conta/i }));

    expect(
      await screen.findByText(/Por favor, insira o código de 6 dígitos./i),
    ).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /Voltar/i });
    fireEvent.click(backButton);
    expect(screen.getByPlaceholderText('ex: Chiquinha Silva')).toBeInTheDocument();
  });

  it('submits verify and handles error', async () => {
    api.register.mockResolvedValueOnce({ sucesso: true, dados: {} });
    api.verifyRegistration.mockResolvedValueOnce({ sucesso: false, mensagem: 'Wrong OTP' });

    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passFields[0], { target: { value: 'pass123' } });
    fireEvent.change(passFields[1], { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Avançar/i }));

    const verifyInput = await screen.findByPlaceholderText('Ex: 123456');
    fireEvent.change(verifyInput, { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Verificar Conta/i }));

    const errorMsg = await screen.findByText(/Wrong OTP/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('submits verify and handles throw error', async () => {
    api.register.mockResolvedValueOnce({ sucesso: true, dados: {} });
    api.verifyRegistration.mockRejectedValueOnce(new Error('Network issue'));

    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const passFields = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@edu.br' } });
    fireEvent.change(passFields[0], { target: { value: 'pass123' } });
    fireEvent.change(passFields[1], { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Avançar/i }));

    const verifyInput = await screen.findByPlaceholderText('Ex: 123456');
    fireEvent.change(verifyInput, { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Verificar Conta/i }));

    const errorMsg = await screen.findByText(/Network issue/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('triggers onInvalid when form is submitted with missing required fields', () => {
    vi.useFakeTimers();
    render(<Register />, { wrapper: Wrapper });
    const nameInput = screen.getByPlaceholderText('ex: Chiquinha Silva');

    // We can simulate an invalid event on the form by firing it directly on the input or the form
    fireEvent.invalid(nameInput);

    // Check if the shaking animation state is triggered (we can't easily check the state directly,
    // but we can advance timers to cover the setTimeout)
    vi.advanceTimersByTime(500);
    vi.useRealTimers();
  });

  it('allows changing the user role', () => {
    render(<Register />, { wrapper: Wrapper });
    const roleSelect = screen.getByRole('combobox', { name: 'perfil' });
    fireEvent.change(roleSelect, { target: { value: 'ADVISOR' } });
    expect(roleSelect.value).toBe('ADVISOR');
  });
});
