import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
