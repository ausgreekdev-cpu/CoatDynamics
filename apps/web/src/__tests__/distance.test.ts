import { describe, it, expect } from 'vitest';
import { haversine } from '../utils/distance';

describe('haversine', () => {
  it('returns ~0 for same point', () => {
    expect(haversine({ lat: 1, lng: 2 }, { lat: 1, lng: 2 })).toBeCloseTo(0, 5);
  });
  it('computes distance between two points', () => {
    const d = haversine({ lat: 0, lng: 0 }, { lat: 0, lng: 1 });
    expect(d).toBeGreaterThan(110);
    expect(d).toBeLessThan(112);
  });
});
