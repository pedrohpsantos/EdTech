import { renderHook, act } from '@testing-library/react';
import useEasterEggs from '../useEasterEggs';
import { vi } from 'vitest';

describe('useEasterEggs hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    console.log = vi.fn();

    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test('should log welcome messages on mount', () => {
    renderHook(() => useEasterEggs());
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('🚀 BEM-VINDO'),
      expect.anything(),
    );
  });

  test('should activate konami code after correct sequence', () => {
    const { result } = renderHook(() => useEasterEggs());

    expect(result.current.konamiActivated).toBe(false);

    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];

    act(() => {
      konamiCode.forEach((key) => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
      });
    });

    expect(result.current.konamiActivated).toBe(true);

    // Should deactivate after 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.konamiActivated).toBe(false);
  });

  test('should activate hyperdrive after 5 rapid clicks', () => {
    const { result } = renderHook(() => useEasterEggs());

    expect(result.current.hyperdriveActivated).toBe(false);

    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.handleLogoClick();
      }
    });

    expect(result.current.hyperdriveActivated).toBe(true);

    // Should deactivate after 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.hyperdriveActivated).toBe(false);
  });

  test('should reload window after 1 click and 1 second pause', () => {
    const { result } = renderHook(() => useEasterEggs());

    act(() => {
      result.current.handleLogoClick();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
