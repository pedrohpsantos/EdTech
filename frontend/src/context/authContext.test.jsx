import { render, screen, act } from '@testing-library/react';
import AuthProvider, { useAuth } from './authContext';
import { describe, it, expect, vi } from 'vitest';

// Mover o mock para o nível superior, fora de qualquer bloco
vi.mock('../services/api', () => ({
    getMe: vi.fn().mockResolvedValue({ sucesso: false }),
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
}));

const TestComponent = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <span data-testid="auth-status">Carregando</span>;
    return (
        <div>
            <span data-testid="auth-status">{isAuthenticated ? 'Logado' : 'Deslogado'}</span>
        </div>
    );
};

describe('AuthContext', () => {
    it('deve inicializar como Deslogado se não houver dados de autenticação', async () => {
        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado');
    });
});
