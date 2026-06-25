import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useScrollProgress from '../../hooks/useScrollProgress';

describe('useScrollProgress', () => {
  it('should return 0 initially', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('should update progress on scroll', () => {
    // Mock scroll dimensions
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true, writable: true });

    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      // Simulate scrolling to 50% (scrollY = 500 out of 1000 total)
      Object.defineProperty(window, 'scrollY', { value: 500, configurable: true, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(50);
  });

  it('should return 0 when page is not scrollable', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 800, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true });

    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(0);
  });
});
