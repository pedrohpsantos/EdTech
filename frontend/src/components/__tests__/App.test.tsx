import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../App';

// Mock all lazy-loaded pages so Suspense resolves immediately
vi.mock('../../pages/login', () => ({ default: () => <div>Login Page</div> }));
vi.mock('../../pages/register', () => ({ default: () => <div>Register Page</div> }));
vi.mock('../../pages/Recovery', () => ({ default: () => <div>Recovery Page</div> }));
vi.mock('../../pages/dashboard', () => ({ default: () => <div>Dashboard Page</div> }));
vi.mock('../../pages/documentos', () => ({ default: () => <div>Documentos Page</div> }));
vi.mock('../../pages/trail', () => ({ default: () => <div>Trail Page</div> }));
vi.mock('../../pages/upload', () => ({ default: () => <div>Upload Page</div> }));
vi.mock('../../pages/settings', () => ({ default: () => <div>Settings Page</div> }));
vi.mock('../../pages/About', () => ({ default: () => <div>About Page</div> }));
vi.mock('../../pages/submissions', () => ({ default: () => <div>Submissions Page</div> }));
vi.mock('../../pages/analytics', () => ({ default: () => <div>Analytics Page</div> }));
vi.mock('../../pages/compliance', () => ({ default: () => <div>Compliance Page</div> }));
vi.mock('../../pages/auditLogs', () => ({ default: () => <div>AuditLogs Page</div> }));
vi.mock('../../pages/projects', () => ({ default: () => <div>Projects Page</div> }));
vi.mock('../../components/privateRoute', () => ({
  default: ({ children }: any) => <>{children}</>,
}));
vi.mock('../../components/GlobalLoader', () => ({
  default: () => null,
}));
vi.mock('../../context/authContext', () => ({
  default: ({ children }: any) => <>{children}</>,
  // Public-route coverage must not start authenticated-only UI imports (Bootstrap).
  useAuth: () => ({ user: null, isAuthenticated: false, isLoading: false }),
}));

const renderApp = (path = '/') => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('App routing', () => {
  it('renders Login on / route', async () => {
    renderApp('/');
    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });

  it('renders Login on /login route', async () => {
    renderApp('/login');
    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });

  it('renders Register on /register route', async () => {
    renderApp('/register');
    expect(await screen.findByText('Register Page')).toBeInTheDocument();
  });

  it('renders About on /about route', async () => {
    renderApp('/about');
    expect(await screen.findByText('About Page')).toBeInTheDocument();
  });

  it('renders NotFound on unknown route', async () => {
    renderApp('/this-does-not-exist');
    expect(await screen.findByText('404 - Página não encontrada')).toBeInTheDocument();
  });

  it('NotFound has a link back to home', async () => {
    renderApp('/xyz');
    const link = await screen.findByRole('link', { name: /voltar/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
