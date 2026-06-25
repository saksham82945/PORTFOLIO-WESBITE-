import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useTypewriter from '../../hooks/useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return empty string initially', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Hello', 'World'], 50, 1000)
    );
    // Initially empty since no character has been typed yet
    expect(result.current).toBe('');
  });

  it('should type characters one by one', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Hello'], 50, 1000)
    );

    // Advance timers to type each character
    act(() => { vi.advanceTimersByTime(50); });
    expect(result.current).toBe('H');

    act(() => { vi.advanceTimersByTime(50); });
    expect(result.current).toBe('He');

    act(() => { vi.advanceTimersByTime(50); });
    expect(result.current).toBe('Hel');

    act(() => { vi.advanceTimersByTime(50); });
    expect(result.current).toBe('Hell');

    act(() => { vi.advanceTimersByTime(50); });
    expect(result.current).toBe('Hello');
  });

  it('should start deleting after pause', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Hi'], 50, 500)
    );

    // Type "Hi" (2 chars × 50ms)
    act(() => { vi.advanceTimersByTime(100); });
    expect(result.current).toBe('Hi');

    // Wait for pause (500ms)
    act(() => { vi.advanceTimersByTime(500); });

    // Start deleting (25ms per char = speed/2)
    act(() => { vi.advanceTimersByTime(25); });
    expect(result.current).toBe('H');

    act(() => { vi.advanceTimersByTime(25); });
    expect(result.current).toBe('');
  });
});
