// @ts-nocheck

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthLayout from '../../components/AuthLayout';

// Mock dependencies
vi.mock('../../components/themeToggle', () => ({
  default: () => <div data-testid="theme-toggle" />,
}));
vi.mock('../../components/NetworkBackground', () => ({
  default: () => <div data-testid="network-background" />,
}));
vi.mock('../../hooks/useEasterEggs', () => ({
  default: () => ({
    konamiActivated: false,
    hyperdriveActivated: false,
    handleLogoClick: vi.fn(),
  }),
}));

describe('AuthLayout', () => {
  it('renders correctly with title, subtitle and children', () => {
    render(
      <AuthLayout title="Test Title" subtitle="Test Subtitle">
        <div data-testid="child-content">Child Content</div>
      </AuthLayout>
    );

    // Verify static branding content
    expect(screen.getByText(/Governança de/i)).toBeInTheDocument();
    
    // Verify props content
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    
    // Verify children
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    // Verify mocks
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('network-background')).toBeInTheDocument();
  });
});
