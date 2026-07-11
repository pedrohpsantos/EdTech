import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ComplianceCenter from '../compliance';
import { getComplianceStats } from '../../services/api';

// Mock the api
vi.mock('../../services/api', () => ({
  getComplianceStats: vi.fn(),
}));

// Mock the DashboardLayout
vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, title }: any) => (
    <div data-testid="dashboard-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

describe('ComplianceCenter Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing initially when stats are not loaded', () => {
    (getComplianceStats as any).mockResolvedValueOnce(null);
    const { container } = render(<ComplianceCenter />);
    expect(container.firstChild).toBeNull();
  });

  it('renders compliance stats after loading', async () => {
    const mockStats = {
      score: 85,
      scoreTrend: 5,
      compliantPolicies: 10,
      totalPolicies: 12,
      pendingItems: 2,
      totalEvents: 100,
      policies: [
        {
          name: 'Policy 1',
          status: 'conforme',
          percentage: 100,
          text: 'Fully compliant'
        },
        {
          name: 'Policy 2',
          status: 'parcial',
          percentage: 50,
          text: 'Partially compliant'
        },
        {
          name: 'Policy 3',
          status: 'pendente',
          percentage: 0,
          text: 'Not compliant'
        }
      ]
    };

    (getComplianceStats as any).mockResolvedValueOnce(mockStats);

    render(<ComplianceCenter />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    });

    expect(screen.getByText('Centro de Conformidade')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('+5 pts')).toBeInTheDocument();
    expect(screen.getByText('10/12')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Policy 1')).toBeInTheDocument();
    expect(screen.getByText('Policy 2')).toBeInTheDocument();
    expect(screen.getByText('Policy 3')).toBeInTheDocument();
  });
});
