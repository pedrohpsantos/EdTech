import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../About';

describe('About Page', () => {
  it('renders the About page correctly', () => {
    render(<About />);

    // Check main headings and texts
    expect(screen.getByText('Sobre o Projeto EdTech')).toBeInTheDocument();
    expect(screen.getByText(/O EdTech é uma plataforma moderna/i)).toBeInTheDocument();

    // Check team members
    expect(screen.getByText('Pedro Henrique P. Santos')).toBeInTheDocument();
    expect(screen.getByText('Arthur Leite (arthurlleite)')).toBeInTheDocument();
    expect(screen.getByText('Alana Feitosa (alanafeitosa-ui)')).toBeInTheDocument();
    expect(screen.getByText('Mateus Araújo (mateusaraujo2006)')).toBeInTheDocument();
    expect(screen.getByText('Mariana Farias (mariana-farias12)')).toBeInTheDocument();
    expect(screen.getByText('Luis G. Ferreira Nunes (LuisGFNunes)')).toBeInTheDocument();

    // Check back link
    const backLink = screen.getByText('← Voltar');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });
});
