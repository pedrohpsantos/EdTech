import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useTheme from '../useTheme';

describe('useTheme hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-bs-theme');
    vi.clearAllMocks();
  });

  it('should initialize with localStorage theme if exists', () => {
    window.localStorage.setItem('tema', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.tema).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  it('should fallback to matchMedia (dark) if no localStorage', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
      })),
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.tema).toBe('dark');
  });

  it('should fallback to light if matchMedia dark is false', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
      })),
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.tema).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    window.localStorage.setItem('tema', 'light');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.tema).toBe('dark');
    expect(window.localStorage.getItem('tema')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    window.localStorage.setItem('tema', 'dark');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.tema).toBe('light');
    expect(window.localStorage.getItem('tema')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
