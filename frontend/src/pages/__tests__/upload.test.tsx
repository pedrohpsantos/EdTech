import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Upload from '../upload';
import { useAuth } from '../../context/authContext';
import { useProjects } from '../../hooks/useProjects';
import { useUploadDocument } from '../../hooks/useDocuments';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../context/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../hooks/useProjects', () => ({
  useProjects: vi.fn(),
}));

vi.mock('../../hooks/useDocuments', () => ({
  useUploadDocument: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, title }: any) => (
    <div data-testid="dashboard-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

describe('Upload Page', () => {
  const mockNavigate = vi.fn();
  const mockUploadDoc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useAuth as any).mockReturnValue({ user: { name: 'John Doe' } });
    (useProjects as any).mockReturnValue({ data: [{ id: '1', name: 'Project 1' }] });
    (useUploadDocument as any).mockReturnValue({ mutateAsync: mockUploadDoc });
  });

  it('renders correctly with user name', () => {
    render(<Upload />);
    expect(screen.getByText('Bom dia, John')).toBeInTheDocument();
  });

  it('renders fallback when user has no name', () => {
    (useAuth as any).mockReturnValue({ user: {} });
    render(<Upload />);
    expect(screen.getByText('Bom dia, Usuário')).toBeInTheDocument();
  });

  it('handles form field changes', () => {
    render(<Upload />);
    
    const titleInput = screen.getByPlaceholderText('Ex: Metodologia Qualitativa v3');
    fireEvent.change(titleInput, { target: { value: 'My Title' } });
    expect(titleInput).toHaveValue('My Title');

    const projectSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(projectSelect, { target: { value: '1' } });
    expect(projectSelect).toHaveValue('1');

    const getCategorySelect = () => screen.getAllByRole('combobox')[1];
    fireEvent.change(getCategorySelect(), { target: { value: 'Metodologia' } });
    expect(getCategorySelect()).toHaveValue('Metodologia');

    const getTagsInput = () => screen.getByPlaceholderText('Ex: LGPD, IA, Dados Sensíveis');
    fireEvent.change(getTagsInput(), { target: { value: 'Tag1, Tag2' } });
    expect(getTagsInput()).toHaveValue('Tag1, Tag2');
  });

  it('handles invalid file drop', () => {
    render(<Upload />);
    const dropArea = screen.getByText('Arraste e solte seu arquivo aqui').parentElement!;
    
    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    fireEvent.drop(dropArea, { dataTransfer: { files: [invalidFile] } });
    
    expect(screen.getByText('Formato inválido. Envie apenas arquivos PDF, CSV ou JSON.')).toBeInTheDocument();
    expect(screen.getByText('Arraste e solte seu arquivo aqui')).toBeInTheDocument(); // still showing default text
  });

  it('handles valid file drop', () => {
    render(<Upload />);
    const dropArea = screen.getByText('Arraste e solte seu arquivo aqui').parentElement!;
    
    fireEvent.dragOver(dropArea);
    expect(dropArea).toHaveStyle({ opacity: '0.7' });

    fireEvent.dragLeave(dropArea);
    
    const validFile = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.drop(dropArea, { dataTransfer: { files: [validFile] } });
    
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.queryByText('Formato inválido.')).not.toBeInTheDocument();
  });

  it('handles file input change', () => {
    render(<Upload />);
    const fileInput = document.getElementById('advancedFileInput') as HTMLInputElement;
    
    const validFile = new File(['{}'], 'data.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    
    expect(screen.getByText('data.json')).toBeInTheDocument();
  });

  it('shows error when required fields are missing on submit', () => {
    render(<Upload />);
    
    const submitBtn = screen.getByRole('button', { name: 'Confirmar Envio' });
    // Since button is disabled when no file, we must force it or add a file first
    // Oh wait, the button is disabled if `!uploadFile`.
    // Let's add a file but no title.
    const fileInput = document.getElementById('advancedFileInput') as HTMLInputElement;
    const validFile = new File(['{}'], 'data.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    
    expect(submitBtn).not.toBeDisabled();
    
    fireEvent.click(submitBtn);
    
    expect(screen.getByText('Por favor, preencha todos os campos obrigatórios (Título, Projeto e Arquivo).')).toBeInTheDocument();
  });

  it('shows error if file is allowed initially but somehow changes to invalid before submit', async () => {
    render(<Upload />);
    
    const titleInput = screen.getByPlaceholderText('Ex: Metodologia Qualitativa v3');
    fireEvent.change(titleInput, { target: { value: 'My Title' } });
    const projectSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(projectSelect, { target: { value: '1' } });

    const fileInput = document.getElementById('advancedFileInput') as HTMLInputElement;
    const validFile = new File(['{}'], 'data.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    
    // Hack file object to be invalid right before submit to hit the branch
    Object.defineProperty(validFile, 'name', { value: 'data.txt' });
    Object.defineProperty(validFile, 'type', { value: 'text/plain' });

    const submitBtn = screen.getByRole('button', { name: 'Confirmar Envio' });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Formato inválido. Envie apenas arquivos PDF, CSV ou JSON.')).toBeInTheDocument();
  });

  it('handles successful upload and redirects', async () => {
    render(<Upload />);
    
    const titleInput = screen.getByPlaceholderText('Ex: Metodologia Qualitativa v3');
    fireEvent.change(titleInput, { target: { value: 'My Title' } });
    const projectSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(projectSelect, { target: { value: '1' } });

    const fileInput = document.getElementById('advancedFileInput') as HTMLInputElement;
    const validFile = new File(['{}'], 'data.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    // Mock implementation to simulate progress
    mockUploadDoc.mockImplementationOnce(async ({ onProgress }) => {
      onProgress({ loaded: 50, total: 100 });
      await Promise.resolve();
    });

    const submitBtn = screen.getByRole('button', { name: 'Confirmar Envio' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/documentos');
    }, { timeout: 3000 });

  });

  it('handles upload failure', async () => {
    render(<Upload />);
    
    const titleInput = screen.getByPlaceholderText('Ex: Metodologia Qualitativa v3');
    fireEvent.change(titleInput, { target: { value: 'My Title' } });
    const projectSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(projectSelect, { target: { value: '1' } });

    const fileInput = document.getElementById('advancedFileInput') as HTMLInputElement;
    const validFile = new File(['{}'], 'data.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    mockUploadDoc.mockRejectedValueOnce(new Error('Upload failed'));

    const submitBtn = screen.getByRole('button', { name: 'Confirmar Envio' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Upload failed')).toBeInTheDocument();
    });
  });

  it('handles cancel button click', () => {
    render(<Upload />);
    const cancelBtn = screen.getByRole('button', { name: 'Cancelar' });
    fireEvent.click(cancelBtn);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
