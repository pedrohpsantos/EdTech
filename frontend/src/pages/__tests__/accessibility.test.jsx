import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/authContext';

// Pages & Components
import Login from '../login';
import Register from '../register';
import ThemeToggle from '../../components/themeToggle';
import GlobalLoader from '../../components/GlobalLoader';
import AuthLayout from '../../components/AuthLayout';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Accessibility Tests (A11y)', () => {
  it('Login page should have no accessibility violations', async () => {
    const { container } = render(
      <AllTheProviders>
        <Login />
      </AllTheProviders>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Register page should have no accessibility violations', async () => {
    const { container } = render(
      <AllTheProviders>
        <Register />
      </AllTheProviders>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ThemeToggle component should have no accessibility violations', async () => {
    const { container } = render(
      <AllTheProviders>
        <ThemeToggle />
      </AllTheProviders>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('GlobalLoader component should have no accessibility violations', async () => {
    const { container } = render(
      <AllTheProviders>
        <GlobalLoader isLoading={true} />
      </AllTheProviders>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('AuthLayout component should have no accessibility violations', async () => {
    const { container } = render(
      <AllTheProviders>
        <AuthLayout title="Test" subtitle="Subtitle">
          <div>Content</div>
        </AuthLayout>
      </AllTheProviders>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
