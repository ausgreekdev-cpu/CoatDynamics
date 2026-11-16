import { describe, it, expect } from 'vitest';
import { calcPaint } from '../pages/SurfaceEstimator';

describe('SurfaceEstimator', () => {
  it('calculates litres from area, coverage and coats', () => {
    expect(calcPaint(100, 10, 2)).toBe(20);
  });
});
