
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from '../../components/themeToggle';
import * as useThemeHook from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme', () => ({
  default: vi.fn(),
}));

describe('ThemeToggle', () => {
  it('renders correctly in light theme', () => {
    useThemeHook.default.mockReturnValue({ tema: 'light', toggleTheme: vi.fn() });
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /Alternar Tema/i });
    expect(button).toBeInTheDocument();
    // It should render the moon icon for light mode
    expect(button.querySelector('.bi-moon-stars-fill')).toBeInTheDocument();
  });

  it('renders correctly in dark theme', () => {
    useThemeHook.default.mockReturnValue({ tema: 'dark', toggleTheme: vi.fn() });
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /Alternar Tema/i });
    // It should render the sun icon for dark mode
    expect(button.querySelector('.bi-sun-fill')).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    const toggleThemeMock = vi.fn();
    useThemeHook.default.mockReturnValue({ tema: 'light', toggleTheme: toggleThemeMock });
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /Alternar Tema/i });
    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
