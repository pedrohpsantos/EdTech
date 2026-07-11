import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import useEasterEggs from '../useEasterEggs';

describe('useEasterEggs hook', () => {
  let originalReload;
  let consoleSpy;

  beforeEach(() => {
    vi.useFakeTimers();
    originalReload = window.location.reload;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: vi.fn() }
    });
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: originalReload }
    });
  });

  it('should initialize correctly and print console messages', () => {
    const { result } = renderHook(() => useEasterEggs());
    expect(result.current.konamiActivated).toBe(false);
    expect(result.current.hyperdriveActivated).toBe(false);
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });

  describe('Konami Code', () => {
    it('should activate konami code and reset after 5s', () => {
      const { result } = renderHook(() => useEasterEggs());
      
      const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      
      act(() => {
        konamiSequence.forEach(key => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key }));
        });
      });

      expect(result.current.konamiActivated).toBe(true);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.konamiActivated).toBe(false);
    });

    it('should handle partial or incorrect sequences', () => {
      const { result } = renderHook(() => useEasterEggs());
      
      act(() => {
        ['ArrowUp', 'ArrowUp', 'x'].forEach(key => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key }));
        });
      });

      expect(result.current.konamiActivated).toBe(false);
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      });

      expect(result.current.konamiActivated).toBe(false);
    });
  });

  describe('Logo Clicks (Hyperdrive & Reload)', () => {
    it('should reload page when clicked exactly once and paused for 1s', () => {
      const { result } = renderHook(() => useEasterEggs());

      act(() => {
        result.current.handleLogoClick();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('should not reload if clicked more than once but less than 5 times and paused', () => {
      const { result } = renderHook(() => useEasterEggs());

      act(() => {
        result.current.handleLogoClick();
        result.current.handleLogoClick();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(window.location.reload).not.toHaveBeenCalled();
      
      // Since it resets to 0, another single click + pause will trigger reload
      act(() => {
        result.current.handleLogoClick();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('should activate hyperdrive on 5 clicks and reset after 10s', () => {
      const { result } = renderHook(() => useEasterEggs());

      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.handleLogoClick();
        }
      });

      expect(result.current.hyperdriveActivated).toBe(true);

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(result.current.hyperdriveActivated).toBe(false);
    });

    it('should ignore clicks if hyperdrive is already activated', () => {
      const { result } = renderHook(() => useEasterEggs());

      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.handleLogoClick();
        }
      });

      expect(result.current.hyperdriveActivated).toBe(true);

      // Now it's activated, call handleLogoClick again. It should return early.
      act(() => {
        result.current.handleLogoClick();
      });

      expect(result.current.hyperdriveActivated).toBe(true);
      
      // Fast forward the 10s from the initial hyperdrive activation
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(result.current.hyperdriveActivated).toBe(false);
    });

    it('should clear hyperdrive timeout if reached 5 clicks concurrently multiple times', () => {
      const { result } = renderHook(() => useEasterEggs());

      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.handleLogoClick();
        }
      });

      expect(result.current.hyperdriveActivated).toBe(true);
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(result.current.hyperdriveActivated).toBe(false);
    });
  });
});
