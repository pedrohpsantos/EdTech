import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from '../dashboard';
import { useAuth } from '../../context/authContext';
import {
  getDashboardStats,
  getAuditLogs,
  getComplianceStats,
  getDocuments,
  getLaboratoryTokens,
} from '../../services/api';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../context/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../services/api', () => ({
  getDashboardStats: vi.fn(),
  getAuditLogs: vi.fn(),
  getComplianceStats: vi.fn(),
  getDocuments: vi.fn(),
  getLaboratoryTokens: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, title, customTopbarElement }: any) => (
    <div data-testid="dashboard-layout">
      <h1>{title}</h1>
      <div data-testid="topbar">{customTopbarElement}</div>
      {children}
    </div>
  ),
}));

describe('Dashboard Page', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);

    // Default mocks
    (getDashboardStats as any).mockResolvedValue({
      activeDocuments: 10,
      pendingReview: 5,
      complianceScore: 90,
      researchProgress: 80,
    });
    (getDocuments as any).mockResolvedValue({
      sucesso: true,
      dados: { content: [] },
    });
    (getComplianceStats as any).mockResolvedValue({
      totalEvents: 100,
      pendingItems: 2,
      compliantPolicies: 4,
      totalPolicies: 5,
      score: 95,
      scoreTrend: 5,
    });
    (getAuditLogs as any).mockResolvedValue([]);
    (getLaboratoryTokens as any).mockResolvedValue({
      sucesso: true,
      dados: { researcher_token: 'RTK123', auditor_token: 'ATK123' },
    });
  });

  it('renders default user and UNKNOWN role properly', async () => {
    (useAuth as any).mockReturnValue({ user: null });
    render(<Dashboard />);

    expect(screen.getByText('Bom dia, Usuário')).toBeInTheDocument();
    expect(screen.getByText('Ver Trilha de Pesquisa')).toBeInTheDocument(); // Default topbar
    expect(screen.getAllByText('0').length).toBeGreaterThan(0); // New accounts never receive invented metrics
  });

  it('renders correctly for RESEARCHER role', async () => {
    (useAuth as any).mockReturnValue({ user: { name: 'Researcher Joe', role: 'RESEARCHER' } });

    const mockDocs = {
      sucesso: true,
      dados: {
        content: [
          { id: '1', title: 'doc1.pdf', createdAt: '2023-01-01', status: 'Aprovado' },
          { id: '2', title: 'doc2.csv', createdAt: '2023-01-02', status: 'Revisão' },
        ],
      },
    };
    (getDocuments as any).mockResolvedValue(mockDocs);

    render(<Dashboard />);

    await waitFor(() => {
      expect(getDashboardStats).toHaveBeenCalled();
      expect(getDocuments).toHaveBeenCalled();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    expect(screen.getByText('Bom dia, Researcher')).toBeInTheDocument();

    // Check topbar
    const trailBtn = screen.getByText('Ver Trilha de Pesquisa');
    fireEvent.click(trailBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/trail');

    // Check alert
    expect(screen.getByText('AÇÃO REQUERIDA')).toBeInTheDocument();
    const fixNowBtn = screen.getByText('Corrigir agora');
    fireEvent.click(fixNowBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/trail');

    // Check recent docs
    expect(screen.getByText('Minhas Submissões Recentes')).toBeInTheDocument();
    expect(screen.getByText('doc1.pdf')).toBeInTheDocument();
    expect(screen.getByText('doc2.csv')).toBeInTheDocument();

    const verBtns = screen.getAllByText('Ver');
    fireEvent.click(verBtns[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/documentos');

    // Check Compliance UI for researcher
    expect(screen.getByText('Meu Perfil de Conformidade')).toBeInTheDocument();
  });

  it('handles empty documents for RESEARCHER', async () => {
    (useAuth as any).mockReturnValue({ user: { role: 'RESEARCHER' } });
    (getDocuments as any).mockResolvedValue({ sucesso: false }); // Test failure branch

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum documento')).toBeInTheDocument();
    });
  });

  it('renders correctly for ADVISOR role', async () => {
    (useAuth as any).mockReturnValue({ user: { name: 'Advisor Smith', role: 'ADVISOR' } });

    const mockDocs = {
      sucesso: true,
      dados: {
        content: [
          {
            id: '1',
            title: 'doc1.pdf',
            createdAt: '2023-01-01',
            status: 'Pendente',
            author: { name: 'Student 1' },
          },
        ],
      },
    };
    (getDocuments as any).mockResolvedValue(mockDocs);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Bom dia, Advisor')).toBeInTheDocument();
    });

    // Check topbar
    const submissionsBtn = screen.getByText('Ver submissões');
    fireEvent.click(submissionsBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/submissions');

    // Check alert
    expect(screen.getByText('PRÓXIMO PASSO')).toBeInTheDocument();
    const detailsBtn = screen.getByText('Abrir fila de revisão');
    fireEvent.click(detailsBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/submissions');

    // Check recent docs
    expect(screen.getByText('Revisões Pendentes')).toBeInTheDocument();
    expect(screen.getByText('doc1.pdf')).toBeInTheDocument();

    const revisarBtns = screen.getAllByText('Revisar');
    fireEvent.click(revisarBtns[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/submissions');

    // Check Compliance UI for Advisor
    expect(screen.getByText('Pontuação de Conformidade (Laboratório)')).toBeInTheDocument();
  });

  it('renders correctly for AUDITOR role', async () => {
    (useAuth as any).mockReturnValue({ user: { name: 'Auditor Jane', role: 'AUDITOR' } });

    const mockLogs = [
      { id: '1', action: 'Data Download', details: 'Downloaded secure data', userName: 'User 1' },
    ];
    (getAuditLogs as any).mockResolvedValue(mockLogs);

    render(<Dashboard />);

    await waitFor(() => {
      expect(getComplianceStats).toHaveBeenCalled();
      expect(getAuditLogs).toHaveBeenCalled();
    });

    expect(screen.getByText('Bom dia, Auditor')).toBeInTheDocument();

    // Check topbar
    const logsBtn = screen.getByText('Ver logs de auditoria');
    fireEvent.click(logsBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/audit-logs');

    // Check stats
    expect(screen.getByText('100')).toBeInTheDocument(); // totalEvents

    // Check alert
    expect(screen.getByText('FALHA CRÍTICA DE RETENÇÃO')).toBeInTheDocument();
    const investigateBtn = screen.getByText('Investigar');
    fireEvent.click(investigateBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/compliance-center');

    // Check recent logs
    expect(screen.getByText('Atividades Críticas Recentes')).toBeInTheDocument();
    expect(screen.getByText('Data Download')).toBeInTheDocument();

    const viewLogsLink = screen.getByText('Ver logs'); // The small link in the header
    fireEvent.click(viewLogsLink);
    expect(mockNavigate).toHaveBeenCalledWith('/audit-logs');

    // Check Compliance UI for Auditor
    expect(screen.getByText('Conformidade Institucional')).toBeInTheDocument();
  });

  it('handles empty logs for AUDITOR', async () => {
    (useAuth as any).mockReturnValue({ user: { role: 'AUDITOR' } });
    (getAuditLogs as any).mockResolvedValue([]);
    (getComplianceStats as any).mockResolvedValue(null); // test fallback

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Nenhum log crítico')).toBeInTheDocument();
      // Test fallback values for stats (0)
      expect(screen.getAllByText('0').length).toBeGreaterThan(0);
    });
  });

  it('handles empty documents for ADVISOR', async () => {
    (useAuth as any).mockReturnValue({ user: { role: 'ADVISOR' } });
    (getDocuments as any).mockResolvedValue({ sucesso: true, dados: { content: [] } });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Nenhuma submissão pendente.')).toBeInTheDocument();
    });
  });
});
