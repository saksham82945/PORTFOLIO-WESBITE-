import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useMouseParallax from '../../hooks/useMouseParallax';

describe('useMouseParallax', () => {
  it('should return initial position {x: 0, y: 0}', () => {
    const { result } = renderHook(() => useMouseParallax(0.02));

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should update position on mousemove', () => {
    const { result } = renderHook(() => useMouseParallax(0.02));

    act(() => {
      // Simulate mouse at center of a 1000x800 window
      window.innerWidth = 1000;
      window.innerHeight = 800;

      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: 750, // 0.75 → (0.75 - 0.5) * 0.02 = 0.005
        clientY: 200, // 0.25 → (0.25 - 0.5) * 0.02 = -0.005
      }));
    });

    expect(result.current.x).toBeCloseTo(0.005, 4);
    expect(result.current.y).toBeCloseTo(-0.005, 4);
  });

  it('should respect custom factor', () => {
    const { result } = renderHook(() => useMouseParallax(0.1));

    act(() => {
      window.innerWidth = 1000;
      window.innerHeight = 1000;

      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: 1000, // 1.0 → (1.0 - 0.5) * 0.1 = 0.05
        clientY: 0,    // 0.0 → (0.0 - 0.5) * 0.1 = -0.05
      }));
    });

    expect(result.current.x).toBeCloseTo(0.05, 4);
    expect(result.current.y).toBeCloseTo(-0.05, 4);
  });
});
