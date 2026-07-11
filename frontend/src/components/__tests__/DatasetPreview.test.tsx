import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DatasetPreview from '../DatasetPreview';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch as any;

describe('DatasetPreview', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    expect(screen.getByText('Carregando dados do dataset...')).toBeInTheDocument();
  });

  it('renders CSV data correctly', async () => {
    const csvContent = 'id,name\n1,Alice\n2,Bob\n';
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(csvContent)
    });

    render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    
    await waitFor(() => {
      expect(screen.queryByText('Carregando dados do dataset...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Exibindo 2 de 2 linhas...')).toBeInTheDocument();
  });

  it('handles empty CSV', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('\n   \n')
    });
    render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    
    await waitFor(() => {
      expect(screen.getByText('Dataset CSV vazio.')).toBeInTheDocument();
    });
  });

  it('renders JSON data correctly', async () => {
    const jsonContent = JSON.stringify({ message: 'hello' });
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(jsonContent)
    });

    render(<DatasetPreview url="http://test.com/data.json" type="JSON" />);
    
    await waitFor(() => {
      expect(screen.queryByText('Carregando dados do dataset...')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/"message": "hello"/)).toBeInTheDocument();
  });

  it('renders JSON fallback on invalid JSON', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('invalid json')
    });

    render(<DatasetPreview url="http://test.com/data.json" type="JSON" />);
    
    await waitFor(() => {
      expect(screen.getByText('Aviso: O arquivo não é um JSON válido.')).toBeInTheDocument();
    });
    expect(screen.getByText('invalid json')).toBeInTheDocument();
  });

  it('renders fallback for unknown type', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('Some text content')
    });

    render(<DatasetPreview url="http://test.com/data.txt" type="TXT" />);
    
    await waitFor(() => {
      expect(screen.getByText('Some text content')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404
    });

    render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    
    await waitFor(() => {
      expect(screen.getByText('Falha no download (Status: 404)')).toBeInTheDocument();
    });
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('handles fallback error message', async () => {
    mockFetch.mockRejectedValue({});

    render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao processar o dataset.')).toBeInTheDocument();
    });
  });

  it('does not update state if unmounted', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('data')
    });

    const { unmount } = render(<DatasetPreview url="http://test.com/data.csv" type="CSV" />);
    unmount();
    // Wait to ensure no act warnings or errors occur
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(mockFetch).toHaveBeenCalled();
  });

  it('does nothing if url is empty', async () => {
    render(<DatasetPreview url="" type="CSV" />);
    // Loading stays forever or component doesn't fetch
    expect(screen.getByText('Carregando dados do dataset...')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
