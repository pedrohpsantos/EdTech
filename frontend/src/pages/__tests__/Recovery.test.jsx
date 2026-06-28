import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Recovery from '../Recovery';
import { requestPasswordRecovery } from '../../services/api';
import { vi } from 'vitest';

// Mock da API para isolar o teste (Unitário)
vi.mock('../../services/api', () => ({
  requestPasswordRecovery: vi.fn(),
  verifyRecoveryCode: vi.fn(),
  resetPassword: vi.fn()
}));

// Mock do framer-motion para evitar erros de animação no JSDOM
vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>),
            h2: React.forwardRef(({ children, ...props }, ref) => <h2 ref={ref} {...props}>{children}</h2>),
            p: React.forwardRef(({ children, ...props }, ref) => <p ref={ref} {...props}>{children}</p>),
            button: React.forwardRef(({ children, ...props }, ref) => <button ref={ref} {...props}>{children}</button>)
        }
    };
});

describe('Recovery Component - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Renderiza o Passo 1 inicialmente e pede e-mail institucional', () => {
    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>
    );
    
    // Verifica se o título do passo 1 está presente
    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument();
    
    // Verifica o campo de input
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    expect(emailInput).toBeInTheDocument();
  });

  test('Submete e-mail e avança para Passo 2 com sucesso', async () => {
    // Simula resposta de sucesso da API mockada
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: true, mensagem: 'Código enviado' });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const submitBtn = screen.getByRole('button', { name: /Continuar/i });
    
    // Simula usuário digitando o e-mail
    fireEvent.change(emailInput, { target: { value: 'teste@unb.br' } });
    
    // Clica em continuar
    fireEvent.click(submitBtn);
    
    // Valida que a API foi chamada corretamente
    expect(requestPasswordRecovery).toHaveBeenCalledWith('teste@unb.br');
    
    // Aguarda a mudança de estado e verifica se a tela do passo 2 apareceu
    await waitFor(() => {
      expect(screen.getByText('Verificação de Código')).toBeInTheDocument();
    });
  });

  test('Exibe erro se a API retornar falha no Passo 1', async () => {
    // Simula falha da API mockada
    requestPasswordRecovery.mockResolvedValueOnce({ sucesso: false, mensagem: 'E-mail não encontrado' });

    render(
      <MemoryRouter>
        <Recovery />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByPlaceholderText('seu.nome@universidade.br');
    const submitBtn = screen.getByRole('button', { name: /Continuar/i });
    
    fireEvent.change(emailInput, { target: { value: 'errado@unb.br' } });
    fireEvent.click(submitBtn);
    
    // Aguarda e verifica a mensagem de erro na tela
    await waitFor(() => {
      expect(screen.getByText(/E-mail não encontrado/i)).toBeInTheDocument();
    });
  });
});
