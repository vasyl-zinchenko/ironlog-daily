/**
 * Local timezone-safe date utilities
 * Avoids UTC shifts from new Date().toISOString()
 */

export function getLocalTodayDateString(d = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateStr: string): Date {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date();
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

export function getCalendarDaysDiff(earlierDateStr: string, laterDateStr: string): number {
  if (earlierDateStr === laterDateStr) return 0;
  const d1 = parseLocalDate(earlierDateStr);
  const d2 = parseLocalDate(laterDateStr);

  // Normalize hours to midnight to compare exact calendar days
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const diffMs = d2.getTime() - d1.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function formatUkrainianDate(d = new Date()): {
  formattedFullDate: string;
  weekdayName: string;
  dayAndMonth: string;
} {
  const weekdayFormatter = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' });
  const dayMonthFormatter = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long' });
  const fullFormatter = new Intl.DateTimeFormat('uk-UA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const rawWeekday = weekdayFormatter.format(d);
  const weekdayName = rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1);
  const dayAndMonth = dayMonthFormatter.format(d);
  const formattedFullDate = fullFormatter.format(d);

  return {
    formattedFullDate,
    weekdayName,
    dayAndMonth,
  };
}

