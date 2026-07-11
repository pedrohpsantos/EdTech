// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Recovery from '../Recovery';
import { requestPasswordRecovery, verifyRecoveryCode, resetPassword } from '../../services/api';
import { vi, describe, beforeEach, test, expect } from 'vitest';

// Mock da API para isolar o teste (Unitário)
vi.mock('../../services/api', () => ({
  requestPasswordRecovery: vi.fn(),
  verifyRecoveryCode: vi.fn(),
  resetPassword: vi.fn(),
}));



describe('Recovery Component - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Renderiza o Passo 1 inicialmente e pede e-mail institucional', () => {
    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    // Verifica se o título do passo 1 está presente
    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument();

    // Verifica o campo de input
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    expect(emailInput).toBeInTheDocument();
  });

  test('Submete e-mail e avança para Passo 2 com sucesso', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true, mensagem: 'Código enviado' });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const submitBtn = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'teste@unb.br' } });
    fireEvent.click(submitBtn);

    expect(requestPasswordRecovery).toHaveBeenCalledWith('teste@unb.br');

    await waitFor(() => {
      expect(screen.getByText('Verificação de Código')).toBeInTheDocument();
    });
  });

  test('Exibe erro se a API retornar falha no Passo 1', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({
      sucesso: false,
      mensagem: 'E-mail não encontrado',
    });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const submitBtn = screen.getByRole('button', { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: 'errado@unb.br' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/E-mail não encontrado/i)).toBeInTheDocument();
    });
  });

  test('Passo 2: Submete código OTP e avança para Passo 3', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true, mensagem: 'Código enviado' });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: true, mensagem: 'Código validado' });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    // Passa pelo Passo 1
    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));

    await waitFor(() => expect(screen.getByText('Verificação de Código')).toBeInTheDocument());

    // Passo 2
    const codeInput = screen.getByPlaceholderText('123456');
    fireEvent.change(codeInput, { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));

    expect(verifyRecoveryCode).toHaveBeenCalledWith('teste@unb.br', '000000');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Nova Senha' })).toBeInTheDocument();
    });
  });

  test('Passo 2: Erro ao submeter OTP inválido', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: false, mensagem: 'Código inválido' });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByPlaceholderText('123456'), { target: { value: '999999' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Código inválido/i)).toBeInTheDocument();
    });
  });

  test('Passo 3: Redefine senha com sucesso', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: true });
    resetPassword.mockResolvedValueOnce({ sucesso: true });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    // Go to step 2
    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument(),
    );

    // Go to step 3
    fireEvent.change(screen.getByPlaceholderText('123456'), { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Nova Senha' })).toBeInTheDocument(),
    );

    // Fill passwords
    const passInputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(passInputs[0], { target: { value: 'novaSenha123' } });
    fireEvent.change(passInputs[1], { target: { value: 'novaSenha123' } });

    fireEvent.click(screen.getByRole('button', { name: /Redefinir Senha/i }));

    expect(resetPassword).toHaveBeenCalledWith('teste@unb.br', '000000', 'novaSenha123');

    await waitFor(() => {
      expect(screen.getByText(/Senha redefinida com sucesso!/i)).toBeInTheDocument();
    });
  });

  test('Passo 3: Erro de senhas que não coincidem', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: true });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    // Go to step 3
    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument(),
    );
    fireEvent.change(screen.getByPlaceholderText('123456'), { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Nova Senha' })).toBeInTheDocument(),
    );

    const passInputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(passInputs[0], { target: { value: 'novaSenha123' } });
    fireEvent.change(passInputs[1], { target: { value: 'senhaDiferente' } });

    fireEvent.click(screen.getByRole('button', { name: /Redefinir Senha/i }));

    await waitFor(() => {
      expect(screen.getByText(/As senhas não coincidem./i)).toBeInTheDocument();
    });
  });

  test('Passo 3: Alterna visibilidade das senhas', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: true });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    // Go to step 3
    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument(),
    );
    fireEvent.change(screen.getByPlaceholderText('123456'), { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Nova Senha' })).toBeInTheDocument(),
    );

    const toggleBtns = screen.getAllByRole('button', { name: /Mostrar/i });
    const passInputs = screen.getAllByPlaceholderText('••••••••');

    // Initially passwords are hidden (type="password")
    expect(passInputs[0]).toHaveAttribute('type', 'password');
    expect(passInputs[1]).toHaveAttribute('type', 'password');

    // Toggle first password
    fireEvent.click(toggleBtns[0]);
    expect(passInputs[0]).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtns[0]);
    expect(passInputs[0]).toHaveAttribute('type', 'password');

    // Toggle second password
    fireEvent.click(toggleBtns[1]);
    expect(passInputs[1]).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtns[1]);
    expect(passInputs[1]).toHaveAttribute('type', 'password');
  });

  test('Passo 2: Volta para o Passo 1 ao clicar em Alterar e-mail', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    // Go to step 2
    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument(),
    );

    // Click Alterar e-mail
    fireEvent.click(screen.getByRole('button', { name: /Alterar e-mail/i }));

    // Check if we are back at step 1
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Esqueceu a senha?' })).toBeInTheDocument();
    });
  });

  test('Passo 3: Erro da API ao redefinir senha', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: true });
    resetPassword.mockResolvedValueOnce({ sucesso: false, mensagem: 'Token expirado' });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('123456'), { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Nova Senha' })).toBeInTheDocument());

    const passInputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(passInputs[0], { target: { value: 'novaSenha123' } });
    fireEvent.change(passInputs[1], { target: { value: 'novaSenha123' } });

    fireEvent.click(screen.getByRole('button', { name: /Redefinir Senha/i }));

    await waitFor(() => {
      expect(screen.getByText(/Token expirado/i)).toBeInTheDocument();
    });
  });

  test('Passo 3: Erro de exceção da API ao redefinir senha', async () => {
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true });
    verifyRecoveryCode.mockResolvedValueOnce({ sucesso: true });
    resetPassword.mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('seu.nome@universidade.br'), {
      target: { value: 'teste@unb.br' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Verificação de Código' })).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('123456'), { target: { value: '000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuar/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Nova Senha' })).toBeInTheDocument());

    const passInputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(passInputs[0], { target: { value: 'novaSenha123' } });
    fireEvent.change(passInputs[1], { target: { value: 'novaSenha123' } });

    fireEvent.click(screen.getByRole('button', { name: /Redefinir Senha/i }));

    await waitFor(() => {
      expect(screen.getByText(/Erro no servidor/i)).toBeInTheDocument();
    });
  });
  
  test('Dispara onInvalid em campos requeridos (Step 1)', async () => {
    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>,
    );
    
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    
    // Attempting to submit without required valid email will trigger invalid
    fireEvent.invalid(emailInput);
  });
});
