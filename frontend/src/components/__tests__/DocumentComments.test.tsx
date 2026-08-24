import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DocumentComments from '../DocumentComments';
import * as hooks from '../../hooks/useDocuments';

vi.mock('../../hooks/useDocuments', () => ({
  useComments: vi.fn(),
  useAddComment: vi.fn(),
}));

describe('DocumentComments', () => {
  const scrollIntoViewMock = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (hooks.useComments as any).mockReturnValue({ data: [], isLoading: true });
    (hooks.useAddComment as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: false });

    render(<DocumentComments documentId="doc1" />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders empty state when no comments', () => {
    (hooks.useComments as any).mockReturnValue({ data: [], isLoading: false });
    (hooks.useAddComment as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: false });

    render(<DocumentComments documentId="doc1" />);
    expect(screen.getByText('Nenhum comentário ainda. Inicie a conversa!')).toBeInTheDocument();
  });

  it('renders comments', () => {
    const comments = [
      {
        id: '1',
        authorName: 'User One',
        createdAt: '2023-01-01T10:00:00Z',
        content: 'First comment',
      },
      {
        id: '2',
        authorName: 'User Two',
        createdAt: '2023-01-01T11:00:00Z',
        content: 'Second comment',
      },
    ];
    (hooks.useComments as any).mockReturnValue({ data: comments, isLoading: false });
    (hooks.useAddComment as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: false });

    render(<DocumentComments documentId="doc1" />);

    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('User Two')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
  });

  it('submits a new comment', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({});
    (hooks.useComments as any).mockReturnValue({ data: [], isLoading: false });
    (hooks.useAddComment as any).mockReturnValue({ mutateAsync, isPending: false });

    render(<DocumentComments documentId="doc1" />);

    const input = screen.getByPlaceholderText('Adicionar comentário...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New comment' } });
    expect(input).toHaveValue('New comment');
    expect(button).not.toBeDisabled();

    fireEvent.submit(screen.getByRole('button').closest('form') as HTMLFormElement);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith('New comment');
    });

    expect(input).toHaveValue('');
  });

  it('prevents submission when input is empty or pending', () => {
    (hooks.useComments as any).mockReturnValue({ data: [], isLoading: false });
    (hooks.useAddComment as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: true });

    render(<DocumentComments documentId="doc1" />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('handles submission error gracefully', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new Error('Submit error'));
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    (hooks.useComments as any).mockReturnValue({ data: [], isLoading: false });
    (hooks.useAddComment as any).mockReturnValue({ mutateAsync, isPending: false });

    render(<DocumentComments documentId="doc1" />);

    const input = screen.getByPlaceholderText('Adicionar comentário...');
    fireEvent.change(input, { target: { value: 'New comment' } });
    fireEvent.submit(screen.getByRole('button').closest('form') as HTMLFormElement);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Failed to post comment', expect.any(Error));
    });

    consoleError.mockRestore();
  });
});
