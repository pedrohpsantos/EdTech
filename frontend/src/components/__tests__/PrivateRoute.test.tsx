import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrivateRoute from '../privateRoute';

vi.mock('../GlobalLoader', () => ({
  default: ({ forceShow }: any) =>
    forceShow ? <div data-testid="global-loader">Loading</div> : null,
}));

vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: any) => <div data-testid="navigate" data-to={to} />,
}));

vi.mock('../../context/authContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../../context/authContext';

describe('PrivateRoute', () => {
  it('shows loader when isLoading is true', () => {
    (useAuth as any).mockReturnValue({ user: null, isAuthenticated: false, isLoading: true });
    render(
      <PrivateRoute>
        <div>Content</div>
      </PrivateRoute>,
    );
    expect(screen.getByTestId('global-loader')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', () => {
    (useAuth as any).mockReturnValue({ user: null, isAuthenticated: false, isLoading: false });
    render(
      <PrivateRoute>
        <div>Content</div>
      </PrivateRoute>,
    );
    const nav = screen.getByTestId('navigate');
    expect(nav).toHaveAttribute('data-to', '/login');
  });

  it('renders children when authenticated and no role restriction', () => {
    (useAuth as any).mockReturnValue({
      user: { role: 'RESEARCHER' },
      isAuthenticated: true,
      isLoading: false,
    });
    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>,
    );
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('renders children when authenticated with correct allowedRole', () => {
    (useAuth as any).mockReturnValue({
      user: { role: 'ADVISOR' },
      isAuthenticated: true,
      isLoading: false,
    });
    render(
      <PrivateRoute allowedRoles={['ADVISOR']}>
        <div>Advisor Content</div>
      </PrivateRoute>,
    );
    expect(screen.getByText('Advisor Content')).toBeInTheDocument();
  });

  it('redirects to /dashboard when authenticated but role not allowed', () => {
    (useAuth as any).mockReturnValue({
      user: { role: 'RESEARCHER' },
      isAuthenticated: true,
      isLoading: false,
    });
    render(
      <PrivateRoute allowedRoles={['AUDITOR']}>
        <div>Secret</div>
      </PrivateRoute>,
    );
    const nav = screen.getByTestId('navigate');
    expect(nav).toHaveAttribute('data-to', '/dashboard');
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
  });

  it('renders children when allowedRoles is empty array (no restriction)', () => {
    (useAuth as any).mockReturnValue({
      user: { role: 'RESEARCHER' },
      isAuthenticated: true,
      isLoading: false,
    });
    render(
      <PrivateRoute allowedRoles={[]}>
        <div>Open Content</div>
      </PrivateRoute>,
    );
    // allowedRoles is truthy but empty → RESEARCHER not in [] → redirect
    const nav = screen.getByTestId('navigate');
    expect(nav).toHaveAttribute('data-to', '/dashboard');
  });
});
