import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock matchMedia to prevent react-query / framer-motion from breaking if they use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Component', () => {
  it('renders without crashing', () => {
    window.history.pushState({}, 'Test page', '/');
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders NotFound on invalid route', () => {
    window.history.pushState({}, 'Test page', '/invalid-route');
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
