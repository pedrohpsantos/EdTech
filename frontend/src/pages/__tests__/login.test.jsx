
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/authContext';
import Login from '../login';

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
  it('renders login form correctly', () => {
    render(<Login />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText('seu.nome@universidade.br')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
});
