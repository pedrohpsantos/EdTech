import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Analytics from '../analytics';

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, customTopbarElement }: any) => (
    <div data-testid="dashboard-layout">
      <div data-testid="topbar">{customTopbarElement}</div>
      {children}
    </div>
  ),
}));

describe('Analytics Page', () => {
  it('renders without crashing and displays key elements', () => {
    render(<Analytics />);

    expect(screen.getByText(/Últimos 6 meses/i)).toBeInTheDocument();

    expect(screen.getByText('Tempo médio de aprovação')).toBeInTheDocument();
    expect(screen.getByText('3.1 d')).toBeInTheDocument();
    expect(screen.getByText('Taxa de retrabalho')).toBeInTheDocument();
    expect(screen.getByText('Pesquisadores ativos')).toBeInTheDocument();
    expect(screen.getByText('Gargalo crítico')).toBeInTheDocument();
    expect(screen.getByText('Revisão')).toBeInTheDocument();

    expect(screen.getByText('Tempo médio de aprovação (dias)')).toBeInTheDocument();
    expect(screen.getByText('Taxa de retrabalho (%)')).toBeInTheDocument();
    expect(screen.getByText('Produtividade por pesquisador')).toBeInTheDocument();
    expect(screen.getByText('Gargalos do fluxo')).toBeInTheDocument();

    expect(screen.getByText('R. Silva')).toBeInTheDocument();
    expect(screen.getByText('Rascunho → Submissão')).toBeInTheDocument();
  });
});
