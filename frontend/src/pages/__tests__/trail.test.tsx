import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ResearchTrail from '../trail';
import * as authContext from '../../context/authContext';

vi.mock('../../context/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../components/layout/DashboardLayout', () => ({
  default: ({ children, customTopbarElement }: any) => (
    <div data-testid="dashboard-layout">
      {customTopbarElement}
      {children}
    </div>
  ),
}));

describe('ResearchTrail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders advisor view by default', () => {
    (authContext.useAuth as any).mockReturnValue({
      user: { role: 'ADVISOR' },
    });
    
    render(<ResearchTrail />);
    
    expect(screen.getByText('Documentos dos orientandos')).toBeInTheDocument();
    expect(screen.getAllByText('Metodologia_Qualitativa_v3.pdf').length).toBeGreaterThan(0);
    
    expect(screen.getByText('Timeline de decisões')).toBeInTheDocument();
  });

  it('renders researcher view correctly', () => {
    (authContext.useAuth as any).mockReturnValue({
      user: { role: 'RESEARCHER' },
    });
    
    render(<ResearchTrail />);
    
    expect(screen.getByText('Meus Documentos')).toBeInTheDocument();
    expect(screen.getAllByText('Referencial_Teorico_Final.pdf').length).toBeGreaterThan(0);
  });

  it('switches selected document and updates details', () => {
    (authContext.useAuth as any).mockReturnValue({
      user: { role: 'ADVISOR' },
    });
    
    render(<ResearchTrail />);
    
    expect(screen.getByText('Timeline de decisões')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Resultados_Parciais_Q2.pdf'));
    
    expect(screen.queryByText('Timeline de decisões')).not.toBeInTheDocument();
    
    const doc1Elements = screen.getAllByText('Metodologia_Qualitativa_v3.pdf');
    fireEvent.click(doc1Elements[0]); // Click the item in list
    expect(screen.getByText('Timeline de decisões')).toBeInTheDocument();
  });
  
  it('displays different statuses and their classes', () => {
      (authContext.useAuth as any).mockReturnValue({
          user: { role: 'ADVISOR' },
      });
      render(<ResearchTrail />);
      
      const approved = screen.getAllByText('Aprovado');
      expect(approved.length).toBeGreaterThan(0);
      
      const review = screen.getByText('Em revisão');
      expect(review).toBeInTheDocument();
      
      const submitted = screen.getByText('Submetido');
      expect(submitted).toBeInTheDocument();
      
      const draft = screen.getByText('Rascunho');
      expect(draft).toBeInTheDocument();
  });
});
