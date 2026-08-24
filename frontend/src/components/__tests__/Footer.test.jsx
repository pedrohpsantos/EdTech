import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer />);

    // Check current year text
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} EdTech AILAB Makers`)).toBeInTheDocument();

    // Check link to about page
    const link = screen.getByRole('link', { name: /Sobre o Projeto/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });
});
