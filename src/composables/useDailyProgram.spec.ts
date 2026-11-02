import { describe, expect, it, beforeEach } from 'vitest';
import {
  getCalendarDaysDiff,
  getLocalTodayDateString,
  parseLocalDate,
  formatUkrainianDate,
} from './useLocalDate';
import { WORKOUT_PROGRAMS } from '../data/workoutPrograms';

describe('useLocalDate and Calendar Days Calculation', () => {
  it('correctly formats local date YYYY-MM-DD avoiding UTC day shift', () => {
    const testDate = new Date(2026, 10, 2); // November 2, 2026
    const formatted = getLocalTodayDateString(testDate);
    expect(formatted).toBe('2026-11-02');
  });

  it('accurately parses YYYY-MM-DD into local Date object', () => {
    const parsed = parseLocalDate('2026-11-02');
    expect(parsed.getFullYear()).toBe(2026);
    expect(parsed.getMonth()).toBe(10); // 0-indexed month (November)
    expect(parsed.getDate()).toBe(2);
  });

  it('calculates 0 days difference for the same day', () => {
    expect(getCalendarDaysDiff('2026-11-02', '2026-11-02')).toBe(0);
  });

  it('calculates exact 1 calendar day difference', () => {
    expect(getCalendarDaysDiff('2026-11-02', '2026-11-03')).toBe(1);
  });

  it('calculates 3 calendar days difference when user missed gym for 3 days', () => {
    expect(getCalendarDaysDiff('2026-11-02', '2026-11-05')).toBe(3);
  });

  it('handles month boundaries properly (e.g. 31 Oct to 2 Nov)', () => {
    expect(getCalendarDaysDiff('2026-10-31', '2026-11-02')).toBe(2);
  });

  it('formats date into Ukrainian locale', () => {
    const testDate = new Date(2026, 10, 2);
    const ukDate = formatUkrainianDate(testDate);
    expect(ukDate.weekdayName).toBeTruthy();
    expect(ukDate.dayAndMonth).toContain('листопада');
  });
});

describe('Daily Program Cycling and Advancement Logic', () => {
  const TOTAL = WORKOUT_PROGRAMS.length; // 12

  beforeEach(() => {
    localStorage.clear();
  });

  it('advances 1 program per calendar day', () => {
    let currentIndex = 0;
    const lastDate = '2026-11-02';
    const nextDay = '2026-11-03';

    const diffDays = getCalendarDaysDiff(lastDate, nextDay);
    expect(diffDays).toBe(1);

    currentIndex = (currentIndex + diffDays) % TOTAL;
    expect(currentIndex).toBe(1); // Program 02
  });

  it('does NOT advance when reloaded on the same day', () => {
    let currentIndex = 3;
    const lastDate = '2026-11-02';
    const sameDay = '2026-11-02';

    const diffDays = getCalendarDaysDiff(lastDate, sameDay);
    expect(diffDays).toBe(0);

    if (diffDays > 0) {
      currentIndex = (currentIndex + diffDays) % TOTAL;
    }
    expect(currentIndex).toBe(3); // Unchanged
  });

  it('advances properly when 3 calendar days have passed', () => {
    let currentIndex = 2; // Program 03
    const lastDate = '2026-11-02';
    const after3Days = '2026-11-05';

    const diffDays = getCalendarDaysDiff(lastDate, after3Days);
    expect(diffDays).toBe(3);

    currentIndex = (currentIndex + diffDays) % TOTAL;
    expect(currentIndex).toBe(5); // Program 06
  });

  it('wraps around from Program 12 (index 11) back to Program 01 (index 0)', () => {
    let currentIndex = 11; // Program 12
    const diffDays = 1;

    currentIndex = (currentIndex + diffDays) % TOTAL;
    expect(currentIndex).toBe(0); // Program 01
  });

  it('manual update immediately advances program and prevents double advance same day', () => {
    let currentIndex = 0; // Program 01
    const today = '2026-11-02';

    // 1. User clicks «Оновити програму» on 02.11
    currentIndex = (currentIndex + 1) % TOTAL;
    let lastDate = today;
    expect(currentIndex).toBe(1); // Program 02
    expect(lastDate).toBe('2026-11-02');

    // 2. User reloads on the same day 02.11 -> diffDays is 0, no duplicate jump
    const reloadDiff = getCalendarDaysDiff(lastDate, '2026-11-02');
    expect(reloadDiff).toBe(0);
    expect(currentIndex).toBe(1); // Still Program 02

    // 3. Next day 03.11 arrives -> diffDays is 1, advances to Program 03
    const nextDayDiff = getCalendarDaysDiff(lastDate, '2026-11-03');
    expect(nextDayDiff).toBe(1);
    currentIndex = (currentIndex + nextDayDiff) % TOTAL;
    lastDate = '2026-11-03';
    expect(currentIndex).toBe(2); // Program 03
  });

  it('rewinds properly to previous program when user updated accidentally', () => {
    let currentIndex = 3; // Program 04
    // User clicks previous day / undo
    currentIndex = (currentIndex - 1 + TOTAL) % TOTAL;
    expect(currentIndex).toBe(2); // Back to Program 03
  });

  it('rewinds and wraps around from Program 01 (index 0) back to Program 12 (index 11)', () => {
    let currentIndex = 0; // Program 01
    currentIndex = (currentIndex - 1 + TOTAL) % TOTAL;
    expect(currentIndex).toBe(11); // Program 12
  });
});

