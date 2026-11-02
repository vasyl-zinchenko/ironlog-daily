import { computed, onMounted, onUnmounted, ref } from 'vue';
import { WORKOUT_PROGRAMS } from '../data/workoutPrograms';
import {
  formatUkrainianDate,
  getCalendarDaysDiff,
  getLocalTodayDateString,
} from './useLocalDate';
import type { WorkoutProgram } from '../types/workout';

const STORAGE_INDEX_KEY = 'ironlog_daily_program_index';
const STORAGE_DATE_KEY = 'ironlog_daily_last_date';

export function useDailyProgram() {
  const currentIndex = ref<number>(0);
  const lastRecordedDate = ref<string>('');
  const notificationMessage = ref<string | null>(null);
  const isTransitioning = ref<boolean>(false);
  let notificationTimer: ReturnType<typeof setTimeout> | null = null;

  function loadStateFromStorage() {
    try {
      const savedIndex = localStorage.getItem(STORAGE_INDEX_KEY);
      const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
      const today = getLocalTodayDateString();

      if (savedIndex !== null && !isNaN(Number(savedIndex))) {
        currentIndex.value = Math.max(0, Math.min(11, Number(savedIndex) % 12));
      } else {
        currentIndex.value = 0;
        localStorage.setItem(STORAGE_INDEX_KEY, '0');
      }

      if (savedDate) {
        lastRecordedDate.value = savedDate;
      } else {
        lastRecordedDate.value = today;
        localStorage.setItem(STORAGE_DATE_KEY, today);
      }
    } catch {
      currentIndex.value = 0;
      lastRecordedDate.value = getLocalTodayDateString();
    }
  }

  function saveStateToStorage(index: number, dateStr: string) {
    try {
      localStorage.setItem(STORAGE_INDEX_KEY, String(index));
      localStorage.setItem(STORAGE_DATE_KEY, dateStr);
    } catch {
      // Ignore localStorage errors (e.g. private browsing quota)
    }
  }

  /**
   * Checks if calendar date changed and advances program accordingly
   */
  function syncDateAndAdvanceIfNeeded(): boolean {
    const today = getLocalTodayDateString();
    const lastDate = lastRecordedDate.value || today;

    const diffDays = getCalendarDaysDiff(lastDate, today);

    if (diffDays > 0) {
      // Days have passed! Advance by diffDays (modulo 12)
      const newIndex = (currentIndex.value + diffDays) % WORKOUT_PROGRAMS.length;
      currentIndex.value = newIndex;
      lastRecordedDate.value = today;
      saveStateToStorage(newIndex, today);
      return true;
    }

    return false;
  }

  /**
   * Manual advance triggered by the user clicking "Оновити програму"
   */
  function manualAdvance() {
    const today = getLocalTodayDateString();
    isTransitioning.value = true;

    // Advance to next program in 12-day sequence
    const nextIndex = (currentIndex.value + 1) % WORKOUT_PROGRAMS.length;
    currentIndex.value = nextIndex;
    lastRecordedDate.value = today;
    saveStateToStorage(nextIndex, today);

    // Show temporary confirmation toast with undo hint
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    notificationMessage.value = 'Підготовлено наступне тренування';
    notificationTimer = setTimeout(() => {
      notificationMessage.value = null;
    }, 4000);

    setTimeout(() => {
      isTransitioning.value = false;
    }, 350);
  }

  /**
   * Rewind to previous program (e.g. if updated accidentally)
   */
  function manualRewind() {
    const today = getLocalTodayDateString();
    isTransitioning.value = true;

    // Rewind to previous program in 12-day sequence
    const prevIndex = (currentIndex.value - 1 + WORKOUT_PROGRAMS.length) % WORKOUT_PROGRAMS.length;
    currentIndex.value = prevIndex;
    lastRecordedDate.value = today;
    saveStateToStorage(prevIndex, today);

    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    notificationMessage.value = 'Повернуто попереднє тренування';
    notificationTimer = setTimeout(() => {
      notificationMessage.value = null;
    }, 4000);

    setTimeout(() => {
      isTransitioning.value = false;
    }, 350);
  }

  const currentProgram = computed<WorkoutProgram>(() => {
    const idx = currentIndex.value % WORKOUT_PROGRAMS.length;
    return WORKOUT_PROGRAMS[idx] ?? WORKOUT_PROGRAMS[0];
  });

  const nextProgram = computed<WorkoutProgram>(() => {
    const idx = (currentIndex.value + 1) % WORKOUT_PROGRAMS.length;
    return WORKOUT_PROGRAMS[idx] ?? WORKOUT_PROGRAMS[0];
  });

  const previousProgram = computed<WorkoutProgram>(() => {
    const idx = (currentIndex.value - 1 + WORKOUT_PROGRAMS.length) % WORKOUT_PROGRAMS.length;
    return WORKOUT_PROGRAMS[idx] ?? WORKOUT_PROGRAMS[0];
  });

  const formattedProgramNumber = computed<string>(() => {
    const num = currentProgram.value.cycleNumber;
    return String(num).padStart(2, '0');
  });

  const todayDateInfo = computed(() => {
    return formatUkrainianDate(new Date());
  });

  function handleVisibilityOrFocus() {
    syncDateAndAdvanceIfNeeded();
  }

  onMounted(() => {
    loadStateFromStorage();
    syncDateAndAdvanceIfNeeded();

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
  });

  onUnmounted(() => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    window.removeEventListener('focus', handleVisibilityOrFocus);
    document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
  });

  return {
    currentIndex,
    currentProgram,
    nextProgram,
    previousProgram,
    formattedProgramNumber,
    totalProgramsCount: WORKOUT_PROGRAMS.length,
    todayDateInfo,
    notificationMessage,
    isTransitioning,
    manualAdvance,
    manualRewind,
    syncDateAndAdvanceIfNeeded,
  };
}

