import { describe, it, expect } from 'vitest';
import { createStarField, createNebulaCloud, lerp } from '../../utils/three-helpers';

describe('three-helpers', () => {
  describe('createStarField', () => {
    it('should return a Points object', () => {
      const stars = createStarField(100);
      expect(stars).toBeDefined();
      expect(stars.type).toBe('Points');
    });

    it('should have the correct number of vertices', () => {
      const count = 500;
      const stars = createStarField(count);
      const positions = stars.geometry.getAttribute('position');
      expect(positions.count).toBe(count);
    });

    it('should use default count of 2000 when no argument provided', () => {
      const stars = createStarField();
      const positions = stars.geometry.getAttribute('position');
      expect(positions.count).toBe(2000);
    });

    it('should have vertex colors', () => {
      const stars = createStarField(100);
      const colors = stars.geometry.getAttribute('color');
      expect(colors).toBeDefined();
      expect(colors.count).toBe(100);
    });

    it('should use PointsMaterial with vertex colors', () => {
      const stars = createStarField(50);
      expect(stars.material.vertexColors).toBe(true);
      expect(stars.material.transparent).toBe(true);
    });
  });

  describe('createNebulaCloud', () => {
    it('should return a Points object', () => {
      const nebula = createNebulaCloud('#FF0000', 100, 10);
      expect(nebula.type).toBe('Points');
    });

    it('should have the correct number of particles', () => {
      const nebula = createNebulaCloud('#7F77DD', 200, 15);
      const positions = nebula.geometry.getAttribute('position');
      expect(positions.count).toBe(200);
    });

    it('should use default parameters', () => {
      const nebula = createNebulaCloud();
      const positions = nebula.geometry.getAttribute('position');
      expect(positions.count).toBe(300); // default count
    });

    it('should be transparent', () => {
      const nebula = createNebulaCloud('#5DCAA5', 50, 10);
      expect(nebula.material.transparent).toBe(true);
      expect(nebula.material.opacity).toBe(0.18);
    });
  });

  describe('lerp', () => {
    it('should return start value when t = 0', () => {
      expect(lerp(0, 10, 0)).toBe(0);
    });

    it('should return end value when t = 1', () => {
      expect(lerp(0, 10, 1)).toBe(10);
    });

    it('should return midpoint when t = 0.5', () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
    });

    it('should handle negative values', () => {
      expect(lerp(-10, 10, 0.5)).toBe(0);
    });

    it('should handle t values outside 0-1 range', () => {
      expect(lerp(0, 10, 2)).toBe(20);
      expect(lerp(0, 10, -1)).toBe(-10);
    });
  });
});
