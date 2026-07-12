import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Documentos from '../documentos';
import { useDocuments, useUploadDocument, useDownloadUrl, useToggleStar } from '../../hooks/useDocuments';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));
vi.mock('../../hooks/useDocuments', () => ({
  useDocuments: vi.fn(),
  useUploadDocument: vi.fn(),
  useDownloadUrl: vi.fn(),
  useToggleStar: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children }: any) => <div data-testid="dashboard-layout">{children}</div>,
}));

vi.mock('../../components/DocumentComments', () => ({
  default: ({ documentId }: any) => <div data-testid="document-comments">{documentId}</div>,
}));

vi.mock('../../components/DatasetPreview', () => ({
  default: ({ url, type }: any) => <div data-testid="dataset-preview">{url} - {type}</div>,
}));

describe('Documentos Page', () => {
  const mockToggleStar = vi.fn();
  const mockGetUrl = vi.fn();
  const mockUploadDoc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useDocuments as any).mockReturnValue({ data: [], isLoading: false });
    (useToggleStar as any).mockReturnValue({ mutateAsync: mockToggleStar });
    (useDownloadUrl as any).mockReturnValue({ mutateAsync: mockGetUrl });
    (useUploadDocument as any).mockReturnValue({ mutateAsync: mockUploadDoc });

    // Mock window.open
    window.open = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders loading state', () => {
    (useDocuments as any).mockReturnValue({ data: [], isLoading: true });
    render(<Documentos />);
    expect(screen.getByText('Carregando documentos...')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<Documentos />);
    expect(screen.getByText('Nenhum documento encontrado.')).toBeInTheDocument();
  });

  it('renders documents with different types and statuses', () => {
    const mockData = [
      { id: '1', title: 'Doc 1', project: 'P1', type: 'PDF', size: '1MB', modified: '2023-01-01', status: 'Em Revisão', starred: true },
      { id: '2', title: 'Doc 2', project: 'P2', type: 'CSV', size: '2MB', modified: '2023-01-02', status: 'Aprovado', starred: false },
      { id: '3', title: 'Doc 3', project: 'P3', type: 'JSON', size: '3MB', modified: '2023-01-03', status: 'Submetido', starred: false },
      { id: '4', title: 'Doc 4', project: 'P4', type: 'DOCX', size: '4MB', modified: '2023-01-04', status: 'Rascunho', starred: false },
    ];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    
    render(<Documentos />);
    
    expect(screen.getByText('Doc 1')).toBeInTheDocument();
    expect(screen.getByText('Doc 2')).toBeInTheDocument();
    expect(screen.getByText('Doc 3')).toBeInTheDocument();
    expect(screen.getByText('Doc 4')).toBeInTheDocument();
    
    // Check if badges rendered correct status
    expect(screen.getAllByText('Em Revisão')[1]).toBeInTheDocument(); // 0 is the select option
    expect(screen.getAllByText('Aprovado')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Submetido')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Rascunho')[1]).toBeInTheDocument();
  });

  it('handles filtering inputs', () => {
    render(<Documentos />);
    
    const searchInput = screen.getByPlaceholderText('Buscar documento...');
    fireEvent.change(searchInput, { target: { value: 'Doc Test' } });
    expect(searchInput).toHaveValue('Doc Test');

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'Aprovado' } });
    expect(statusSelect).toHaveValue('Aprovado');
  });

  it('handles options click', async () => {
    vi.useFakeTimers();
    const mockData = [{ id: '1', title: 'Doc 1', status: 'Aprovado' }];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    render(<Documentos />);
    
    const optionsBtn = screen.getByTitle('Opções');
    fireEvent.click(optionsBtn);
    
    expect(screen.getByText('Carregando opções para: Doc 1')).toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(3100);
    });
    
    expect(screen.queryByText('Carregando opções para: Doc 1')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('handles toggle star success and failure', async () => {
    const mockData = [{ id: '1', title: 'Doc 1', status: 'Aprovado' }];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    render(<Documentos />);
    
    // const starBtn = screen.getByRole('button', { name: '' }); // The button has no text, need to find it by class or structure
    // Since we only have icon buttons, let's find it by some unique trait or just get the first one.
    const toggleStarBtn = document.querySelector('.bi-star')?.closest('button') as HTMLButtonElement;
    
    mockToggleStar.mockResolvedValueOnce({});
    fireEvent.click(toggleStarBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Favorito atualizado!')).toBeInTheDocument();
    });

    mockToggleStar.mockRejectedValueOnce(new Error('error'));
    fireEvent.click(toggleStarBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao atualizar favorito.')).toBeInTheDocument();
    });
  });

  it('handles download success and failure', async () => {
    const mockData = [{ id: '1', title: 'Doc 1', status: 'Aprovado' }];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    render(<Documentos />);
    
    const downloadBtn = screen.getByTitle('Download');
    
    mockGetUrl.mockResolvedValueOnce('http://example.com/file.pdf');
    fireEvent.click(downloadBtn);
    
    expect(screen.getByText('Iniciando download seguro...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith('http://example.com/file.pdf', '_blank', 'noopener,noreferrer');
      expect(screen.getByText('Download finalizado com sucesso!')).toBeInTheDocument();
    });

    mockGetUrl.mockRejectedValueOnce(new Error('Download failed'));
    fireEvent.click(downloadBtn);

    await waitFor(() => {
      expect(screen.getByText('Aviso: Falha ao baixar documento. Download failed')).toBeInTheDocument();
    });
  });

  it('handles preview view for PDF', async () => {
    const mockData = [{ id: '1', title: 'Doc 1', type: 'PDF', status: 'Aprovado' }];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    render(<Documentos />);
    
    const viewBtn = screen.getByTitle('Visualizar');
    
    mockGetUrl.mockResolvedValueOnce('http://example.com/file.pdf');
    fireEvent.click(viewBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Seu navegador não suporta a visualização nativa de PDFs.')).toBeInTheDocument();
    });

    const closeBtn = screen.getAllByRole('button').find(b => b.innerHTML.includes('bi-x-lg'));
    if (closeBtn) {
      fireEvent.click(closeBtn);
    }
  });

  it('handles preview view for CSV', async () => {
    const mockData = [{ id: '1', title: 'Doc 1', type: 'CSV', status: 'Aprovado' }];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    render(<Documentos />);
    
    const viewBtn = screen.getByTitle('Visualizar');
    
    mockGetUrl.mockResolvedValueOnce('http://example.com/file.csv');
    fireEvent.click(viewBtn);
    
    await waitFor(() => {
      expect(screen.getByTestId('dataset-preview')).toBeInTheDocument();
      expect(screen.getByText('http://example.com/file.csv - CSV')).toBeInTheDocument();
    });
    
    // click modal overlay to close
    const overlays = screen.getAllByRole('generic').filter(x => x.className === 'modal-overlay');
    fireEvent.click(overlays[0]);
  });

  it('handles preview view error', async () => {
    const mockData = [{ id: '1', title: 'Doc 1', type: 'PDF', status: 'Aprovado' }];
    (useDocuments as any).mockReturnValue({ data: mockData, isLoading: false });
    render(<Documentos />);
    
    const viewBtn = screen.getByTitle('Visualizar');
    
    mockGetUrl.mockRejectedValueOnce(new Error('fail'));
    fireEvent.click(viewBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar preview do documento')).toBeInTheDocument();
    });
  });

  it('handles upload modal interactions', () => {
    render(<Documentos />);
    
    const newUploadBtn = screen.getByText('Novo Upload (PDF / CSV / JSON)');
    fireEvent.click(newUploadBtn);
    
    expect(screen.getByText('Novo Upload')).toBeInTheDocument();
    
    const uploadArea = screen.getByText('Arraste e solte ou clique para selecionar').parentElement!;
    
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('dragging');
    
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('dragging');
    
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.drop(uploadArea, {
      dataTransfer: { files: [file] },
    });
    
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar Arquivo' })).not.toBeDisabled();
    
    // Test file input change
    const fileInput = document.getElementById('modalFileInput') as HTMLInputElement;
    const file2 = new File(['dummy'], 'test2.csv', { type: 'text/csv' });
    fireEvent.change(fileInput, { target: { files: [file2] } });
    expect(screen.getByText('test2.csv')).toBeInTheDocument();

    const cancelBtn = screen.getByText('Cancelar');
    fireEvent.click(cancelBtn);
    expect(screen.queryByText('Novo Upload')).not.toBeInTheDocument();
  });

  it('handles drag drop without files gracefully', () => {
    render(<Documentos />);
    fireEvent.click(screen.getByText('Novo Upload (PDF / CSV / JSON)'));
    const uploadArea = screen.getByText('Arraste e solte ou clique para selecionar').parentElement!;
    
    fireEvent.drop(uploadArea, {
      dataTransfer: { files: [] },
    });
    
    expect(screen.getByText('Arraste e solte ou clique para selecionar')).toBeInTheDocument();
  });

  it('handles file input without files gracefully', () => {
    render(<Documentos />);
    fireEvent.click(screen.getByText('Novo Upload (PDF / CSV / JSON)'));
    const fileInput = document.getElementById('modalFileInput') as HTMLInputElement;
    
    fireEvent.change(fileInput, { target: { files: [] } });
    
    expect(screen.getByText('Arraste e solte ou clique para selecionar')).toBeInTheDocument();
  });
});

