// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

const Bomb = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Kaboom');
  }
  return <div>Safe</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children if no error', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe')).toBeInTheDocument();
  });

  it('catches error and renders fallback', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Oops! Algo deu errado.')).toBeInTheDocument();
    expect(screen.getByText('Nossa equipe já foi notificada. Por favor, recarregue a página.')).toBeInTheDocument();
    
    consoleError.mockRestore();
  });

  it('reloads page on click', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });
    
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>
    );
    
    const btn = screen.getByText('Recarregar');
    fireEvent.click(btn);
    
    expect(reloadMock).toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
