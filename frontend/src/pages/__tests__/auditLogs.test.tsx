import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuditLogs from '../auditLogs';
import * as authContext from '../../context/authContext';
import * as apiServices from '../../services/api';

vi.mock('../../context/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../services/api', () => ({
  getAuditLogs: vi.fn(),
  exportAuditLogsCSV: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, customTopbarElement }: any) => (
    <div data-testid="dashboard-layout">
      {customTopbarElement}
      {children}
    </div>
  ),
}));

const mockLogs = [
  {
    id: '3',
    eventId: 'EVT-003',
    timestamp: new Date().toISOString(),
    action: 'UPLOAD_DOCUMENT',
    userId: 'USR-101',
    userName: 'João',
    ip: '192.168.1.1',
    details: 'Uploaded something',
    severity: 'INFO',
    actionClass: 'info',
  },
  {
    id: '4',
    eventId: 'EVT-004',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    action: 'LOGIN_FAILED',
    userId: 'USR-102',
    userName: 'Maria',
    ip: '10.0.0.1',
    details: 'Login falhou',
    severity: 'WARNING',
    actionClass: 'warning',
  },
  {
    id: '5',
    eventId: 'EVT-005',
    timestamp: new Date().toISOString(),
    action: 'SYSTEM_ERROR',
    userId: 'SYS',
    userName: 'System',
    ip: 'localhost',
    details: 'Critical failure',
    severity: 'CRITICAL',
    actionClass: 'critical',
  }
];

describe('AuditLogs Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (authContext.useAuth as any).mockReturnValue({
      user: { name: 'Admin User', email: 'admin@test.com' },
    });
    (apiServices.getAuditLogs as any).mockResolvedValue(mockLogs);
  });

  it('renders and fetches logs on mount', async () => {
    render(<AuditLogs />);
    
    expect(screen.getByText('Total de Eventos')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('EVT-003')).toBeInTheDocument();
    });
    
    expect(screen.getAllByText('UPLOAD_DOCUMENT').length).toBeGreaterThan(0);
    expect(apiServices.getAuditLogs).toHaveBeenCalledWith('', '', '', '', 0, 20);
  });

  it('toggles row expansion', async () => {
    render(<AuditLogs />);
    await waitFor(() => {
      expect(screen.getByText('EVT-003')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('USR-101'));
    expect(screen.queryByText('EVT-003')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('USR-102'));
    await waitFor(() => {
      expect(screen.getByText('EVT-004')).toBeInTheDocument();
    });
  });

  it('handles search term and action filter', async () => {
    render(<AuditLogs />);
    await waitFor(() => expect(apiServices.getAuditLogs).toHaveBeenCalled());

    const searchInput = screen.getByPlaceholderText('Evento, usuário, IP...');
    fireEvent.change(searchInput, { target: { value: 'USR' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(apiServices.getAuditLogs).toHaveBeenCalledWith('USR', '', '', '', 0, 20);
    });

    const selectFilter = screen.getByDisplayValue('Todas as Ações');
    fireEvent.change(selectFilter, { target: { value: 'LOGIN_FAILED' } });

    await waitFor(() => {
      expect(apiServices.getAuditLogs).toHaveBeenCalledWith('USR', 'LOGIN_FAILED', '', '', 0, 20);
    });
  });

  it('calls export function', async () => {
    render(<AuditLogs />);
    await waitFor(() => expect(apiServices.getAuditLogs).toHaveBeenCalled());

    const exportBtn = screen.getByText(/Exportar CSV/i);
    fireEvent.click(exportBtn);

    expect(apiServices.exportAuditLogsCSV).toHaveBeenCalledWith('', '', '', '');
  });
  
  it('handles refresh button click', async () => {
    render(<AuditLogs />);
    await waitFor(() => expect(apiServices.getAuditLogs).toHaveBeenCalled());
    
    const refreshBtn = screen.getByText(/Atualizar/i);
    fireEvent.click(refreshBtn);
    
    expect(apiServices.getAuditLogs).toHaveBeenCalledTimes(2);
  });
  
  it('renders different actions badges correctly', async () => {
      const complexLogs = [
          { ...mockLogs[0], action: 'LOGIN_SUCCESS', id: '10' },
          { ...mockLogs[0], action: 'SUBMISSION_APPROVED', id: '11' },
          { ...mockLogs[0], action: 'DOCUMENT_VIEWED', id: '12' },
          { ...mockLogs[0], action: 'PERMISSION_CHANGED', id: '13' },
          { ...mockLogs[0], action: 'DOCUMENT_DELETED', id: '14' }
      ];
      (apiServices.getAuditLogs as any).mockResolvedValue(complexLogs);
      render(<AuditLogs />);
      await waitFor(() => {
          expect(screen.getByText('LOGIN_SUCCESS')).toBeInTheDocument();
          expect(screen.getByText('SUBMISSION_APPROVED')).toBeInTheDocument();
          expect(screen.getByText('DOCUMENT_VIEWED')).toBeInTheDocument();
          expect(screen.getByText('PERMISSION_CHANGED')).toBeInTheDocument();
          expect(screen.getByText('DOCUMENT_DELETED')).toBeInTheDocument();
      });
  });
});
