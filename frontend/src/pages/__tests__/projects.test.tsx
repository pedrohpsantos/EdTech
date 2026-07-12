import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Projects from '../projects';
import { getProjects, joinProject } from '../../services/api';

vi.mock('../../services/api', () => ({
  getProjects: vi.fn(),
  joinProject: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, title }: any) => (
    <div data-testid="dashboard-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

describe('Projects Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows loading state initially', async () => {
    // Return a promise that doesn't resolve immediately to keep it in loading state
    let resolvePromise: any;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (getProjects as any).mockReturnValue(promise);
    
    render(<Projects />);
    
    expect(screen.getByText('Carregando projetos...')).toBeInTheDocument();
    
    // Resolve the promise to clean up
    await act(async () => {
      resolvePromise({ sucesso: true, dados: [] });
    });
  });

  it('renders no projects message when empty', async () => {
    (getProjects as any).mockResolvedValueOnce({ sucesso: true, dados: [] });
    
    render(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum projeto encontrado.')).toBeInTheDocument();
    });
  });

  it('renders fallback to empty array if dados is undefined', async () => {
    (getProjects as any).mockResolvedValueOnce({ sucesso: true });
    
    render(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum projeto encontrado.')).toBeInTheDocument();
    });
  });

  it('renders fallback to empty array if sucesso is false', async () => {
    (getProjects as any).mockResolvedValueOnce({ sucesso: false });
    
    render(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum projeto encontrado.')).toBeInTheDocument();
    });
  });

  it('renders projects and handles join success', async () => {
    vi.useFakeTimers();
    const mockProjects = [
      { id: '1', name: 'Project 1', description: 'Desc 1', createdAt: '2023-01-01T00:00:00Z' },
      { id: '2', name: 'Project 2', description: 'Desc 2', createdAt: null }
    ];
    (getProjects as any).mockResolvedValue({ sucesso: true, dados: mockProjects });
    (joinProject as any).mockResolvedValueOnce({ sucesso: true });

    render(<Projects />);
    
    // Flush initial promises to render projects
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1); 
    });

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText(/N\/A/)).toBeInTheDocument(); // For null createdAt

    const joinButtons = screen.getAllByText('Associar-se');
    expect(joinButtons.length).toBe(2);

    // Hover interactions for coverage
    fireEvent.mouseOver(joinButtons[0]);
    fireEvent.mouseOut(joinButtons[0]);

    await act(async () => {
      fireEvent.click(joinButtons[0]);
    });

    expect(joinProject).toHaveBeenCalledWith('1');

    // Wait for the join to succeed and toast to show
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(screen.getByText('Associado ao projeto com sucesso!')).toBeInTheDocument();

    // Advance 3s to hide toast
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3100);
    });

    expect(screen.queryByText('Associado ao projeto com sucesso!')).not.toBeInTheDocument();
  });

  it('handles join failure', async () => {
    const mockProjects = [
      { id: '1', name: 'Project 1', description: 'Desc 1', createdAt: '2023-01-01T00:00:00Z' }
    ];
    (getProjects as any).mockResolvedValueOnce({ sucesso: true, dados: mockProjects });
    
    (joinProject as any).mockResolvedValueOnce({ sucesso: false, mensagem: 'Error joining' });

    render(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });

    const joinButtons = screen.getAllByText('Associar-se');
    
    await act(async () => {
      fireEvent.click(joinButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('Erro: Error joining')).toBeInTheDocument();
    });
  });
});

