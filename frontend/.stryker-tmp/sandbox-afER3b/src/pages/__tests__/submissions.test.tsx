// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Submissions from '../submissions';
import * as authContext from '../../context/authContext';
import * as apiServices from '../../services/api';

vi.mock('../../context/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../services/api', () => ({
  getDocuments: vi.fn(),
  reviewDocument: vi.fn(),
  getDashboardStats: vi.fn(),
  getDownloadUrl: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children }: any) => <div data-testid="dashboard-layout">{children}</div>,
}));

vi.mock('../../components/DatasetPreview', () => ({
  default: ({ url, type }: any) => <div data-testid="dataset-preview" data-url={url} data-type={type}>Dataset</div>,
}));

const mockDocs = [
  {
    id: '1',
    title: 'Doc 1.pdf',
    author: { name: 'Auth One', email: 'auth1@test.com' },
    createdAt: new Date().toISOString(),
    fileUrl: 's3://url/1',
    type: 'PDF'
  },
  {
    id: '2',
    title: 'Data 2.csv',
    author: { name: 'Auth Two', email: 'auth2@test.com' },
    createdAt: new Date().toISOString(),
    fileUrl: 's3://url/2',
    type: 'CSV'
  }
];

describe('Submissions Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (authContext.useAuth as any).mockReturnValue({
      user: { name: 'Advisor', email: 'advisor@test.com' },
    });
    (apiServices.getDashboardStats as any).mockResolvedValue({});
    (apiServices.getDocuments as any).mockResolvedValue({
      sucesso: true,
      dados: { content: mockDocs }
    });
  });

  it('renders documents and stats', async () => {
    render(<Submissions />);
    
    await waitFor(() => {
      expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument();
      expect(screen.getByText('Data 2.csv')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Auth One')).toBeInTheDocument();
    expect(screen.getByText('AO')).toBeInTheDocument(); // Initials
  });

  it('handles API errors during load gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (apiServices.getDashboardStats as any).mockRejectedValue(new Error('API failed'));
      render(<Submissions />);
      
      await waitFor(() => {
          expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load data', expect.any(Error));
      });
      consoleErrorSpy.mockRestore();
  });

  it('handles empty document list', async () => {
      (apiServices.getDocuments as any).mockResolvedValue({
          sucesso: false,
          dados: { content: null }
      });
      render(<Submissions />);
      await waitFor(() => {
          expect(screen.getByText('Nenhuma submissão pendente no momento.')).toBeInTheDocument();
      });
  });

  it('opens and closes analysis modal with PDF', async () => {
    (apiServices.getDownloadUrl as any).mockResolvedValue({ sucesso: true, dados: { downloadUrl: 'http://pdf-url' } });
    const { container } = render(<Submissions />);
    
    await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
    
    const analyzeBtns = screen.getAllByText('Analisar');
    fireEvent.click(analyzeBtns[0]); // Click analyze on Doc 1
    
    await waitFor(() => {
      expect(screen.getByText(/Carregando visualização/i)).toBeInTheDocument(); // Initially loading
    });
    
    await waitFor(() => {
      const obj = container.querySelector('object');
      expect(obj).toHaveAttribute('data', 'http://pdf-url');
    });

    const closeBtn = container.querySelector('button[class*="modalClose"]');
    if (closeBtn) fireEvent.click(closeBtn);
    
    await waitFor(() => {
        expect(screen.queryByText(/Carregando visualização/i)).not.toBeInTheDocument();
    });
  });

  it('opens analysis modal with DatasetPreview for CSV', async () => {
      (apiServices.getDownloadUrl as any).mockResolvedValue({ sucesso: true, dados: { downloadUrl: 'http://csv-url' } });
      render(<Submissions />);
      
      await waitFor(() => expect(screen.getByText('Data 2.csv')).toBeInTheDocument());
      
      const analyzeBtns = screen.getAllByText('Analisar');
      fireEvent.click(analyzeBtns[1]); // Click analyze on Data 2
      
      await waitFor(() => {
          expect(screen.getByTestId('dataset-preview')).toBeInTheDocument();
      });
  });

  it('approves document from analysis modal', async () => {
      (apiServices.getDownloadUrl as any).mockResolvedValue({ sucesso: true, dados: { downloadUrl: 'http://pdf-url' } });
      (apiServices.reviewDocument as any).mockResolvedValue({ sucesso: true });
      
      const { container } = render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const analyzeBtns = screen.getAllByText('Analisar');
      fireEvent.click(analyzeBtns[0]);
      
      await waitFor(() => expect(container.querySelector('div[class*="modalContent"]')).toBeInTheDocument());
      
      const approveBtn = screen.getByText('Aprovar documento');
      fireEvent.click(approveBtn);
      
      await waitFor(() => {
          expect(apiServices.reviewDocument).toHaveBeenCalledWith('1', 'APPROVED');
          expect(apiServices.getDocuments).toHaveBeenCalledTimes(2); // re-fetch
      });
  });

  it('approves document directly from list', async () => {
      (apiServices.reviewDocument as any).mockResolvedValue({ sucesso: true });
      
      const { container } = render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const approveBtns = container.querySelectorAll('button[class*="btnApprove"]');
      fireEvent.click(approveBtns[0]);
      
      await waitFor(() => {
          expect(apiServices.reviewDocument).toHaveBeenCalledWith('1', 'APPROVED');
      });
  });
  
  it('handles approve document error', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      (apiServices.reviewDocument as any).mockResolvedValue({ sucesso: false, mensagem: 'Error approving' });
      
      const { container } = render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const approveBtns = container.querySelectorAll('button[class*="btnApprove"]');
      fireEvent.click(approveBtns[0]);
      
      await waitFor(() => {
          expect(alertSpy).toHaveBeenCalledWith('Erro ao aprovar documento: Error approving');
      });
      alertSpy.mockRestore();
  });

  it('rejects document from analysis modal', async () => {
      (apiServices.getDownloadUrl as any).mockResolvedValue({ sucesso: true, dados: { downloadUrl: 'http://pdf-url' } });
      (apiServices.reviewDocument as any).mockResolvedValue({ sucesso: true });
      
      render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const analyzeBtns = screen.getAllByText('Analisar');
      fireEvent.click(analyzeBtns[0]);
      
      await waitFor(() => expect(screen.getByText('Rejeitar')).toBeInTheDocument());
      fireEvent.click(screen.getByText('Rejeitar'));
      
      await waitFor(() => expect(screen.getByText('Confirmar Rejeição')).toBeInTheDocument());
      
      const feedbackInput = screen.getByPlaceholderText('Descreva os ajustes necessários ao pesquisador...');
      fireEvent.change(feedbackInput, { target: { value: 'Needs work' } });
      
      fireEvent.click(screen.getByText('Confirmar Rejeição'));
      
      await waitFor(() => {
          expect(apiServices.reviewDocument).toHaveBeenCalledWith('1', 'REJECTED', 'Needs work');
      });
  });

  it('rejects document directly from list', async () => {
      (apiServices.reviewDocument as any).mockResolvedValue({ sucesso: true });
      
      const { container } = render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const rejectBtns = container.querySelectorAll('button[class*="btnReject"]');
      fireEvent.click(rejectBtns[0]); // First row reject
      
      await waitFor(() => expect(screen.getByText('Confirmar Rejeição')).toBeInTheDocument());
      
      // Try empty feedback
      fireEvent.click(screen.getByText('Confirmar Rejeição'));
      expect(apiServices.reviewDocument).not.toHaveBeenCalled();
      
      const feedbackInput = screen.getByPlaceholderText('Descreva os ajustes necessários ao pesquisador...');
      fireEvent.change(feedbackInput, { target: { value: 'Needs work list' } });
      
      fireEvent.click(screen.getByText('Confirmar Rejeição'));
      
      await waitFor(() => {
          expect(apiServices.reviewDocument).toHaveBeenCalledWith('1', 'REJECTED', 'Needs work list');
      });
  });

  it('handles reject document error', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      (apiServices.reviewDocument as any).mockResolvedValue({ sucesso: false, mensagem: 'Error rejecting' });
      
      const { container } = render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const rejectBtns = container.querySelectorAll('button[class*="btnReject"]');
      fireEvent.click(rejectBtns[0]);
      
      await waitFor(() => expect(screen.getByText('Confirmar Rejeição')).toBeInTheDocument());
      
      const feedbackInput = screen.getByPlaceholderText('Descreva os ajustes necessários ao pesquisador...');
      fireEvent.change(feedbackInput, { target: { value: 'Needs work list' } });
      
      fireEvent.click(screen.getByText('Confirmar Rejeição'));
      
      await waitFor(() => {
          expect(alertSpy).toHaveBeenCalledWith('Erro ao rejeitar documento: Error rejecting');
      });
      alertSpy.mockRestore();
  });
  
  it('cancels rejection modal', async () => {
      const { container } = render(<Submissions />);
      await waitFor(() => expect(screen.getByText('Doc 1.pdf')).toBeInTheDocument());
      
      const rejectBtns = container.querySelectorAll('button[class*="btnReject"]');
      fireEvent.click(rejectBtns[0]);
      
      await waitFor(() => expect(screen.getByText('Cancelar')).toBeInTheDocument());
      fireEvent.click(screen.getByText('Cancelar'));
      
      await waitFor(() => {
          expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();
      });
  });
});
