import { calculatePoints } from '../utils/rewardCalc';

describe('Reward Points Logic - Unit Tests', () => {
  
  // --- POSITIVE TEST CASES ---
  test('returns 90 points for $120 (Whole Number: 20x2 + 50x1)', () => {
    expect(calculatePoints(120)).toBe(90);
  });

  test('returns 50 points for exactly $100', () => {
    expect(calculatePoints(100)).toBe(50);
  });

  test('calculates fractional values correctly ($75.50 -> 25 points)', () => {
    // 75.5 - 50 = 25.5, floored to 25
    expect(calculatePoints(75.50)).toBe(25);
  });

  // --- NEGATIVE TEST CASES ---
  test('returns 0 points for amounts $50 or less', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(10)).toBe(0);
  });

  test('returns 0 points for negative transaction amounts', () => {
    expect(calculatePoints(-100)).toBe(0);
  });

  test('handles non-numeric inputs gracefully (returns 0)', () => {
    expect(calculatePoints(null)).toBe(0);
    expect(calculatePoints(undefined)).toBe(0);
    expect(calculatePoints("abc")).toBe(0);
  });
});