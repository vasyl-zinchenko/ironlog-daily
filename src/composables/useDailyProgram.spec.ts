import { createApp, h } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCalendarDaysDiff,
  getLocalTodayDateString,
  parseLocalDate,
  formatUkrainianDate,
} from './useLocalDate';
import { useDailyProgram } from './useDailyProgram';

function mountDailyProgram() {
  let program: ReturnType<typeof useDailyProgram>;
  const host = document.createElement('div');
  const app = createApp({
    setup() {
      program = useDailyProgram();
      return () => h('div');
    },
  });

  app.mount(host);

  return {
    program: program!,
    unmount() {
      app.unmount();
      host.remove();
    },
  };
}

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
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps the same program after the date changes and the app regains focus', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 2));
    localStorage.setItem('ironlog_daily_program_index', '3');

    const mounted = mountDailyProgram();
    expect(mounted.program.currentIndex.value).toBe(3);

    vi.setSystemTime(new Date(2026, 10, 5));
    window.dispatchEvent(new Event('focus'));
    document.dispatchEvent(new Event('visibilitychange'));

    expect(mounted.program.currentIndex.value).toBe(3);
    expect(localStorage.getItem('ironlog_daily_program_index')).toBe('3');
    mounted.unmount();
  });

  it('advances and persists the program only when the user finishes the day', () => {
    localStorage.setItem('ironlog_daily_program_index', '2');
    const mounted = mountDailyProgram();

    mounted.program.finishDay();

    expect(mounted.program.currentIndex.value).toBe(3);
    expect(localStorage.getItem('ironlog_daily_program_index')).toBe('3');
    mounted.unmount();

    const reloaded = mountDailyProgram();
    expect(reloaded.program.currentIndex.value).toBe(3);
    reloaded.unmount();
  });
});
