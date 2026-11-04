import { computed, onMounted, onUnmounted, ref } from 'vue';
import { WORKOUT_PROGRAMS } from '../data/workoutPrograms';
import { formatUkrainianDate } from './useLocalDate';
import type { WorkoutProgram } from '../types/workout';

const STORAGE_INDEX_KEY = 'ironlog_daily_program_index';

export function useDailyProgram() {
  const currentIndex = ref<number>(0);
  const notificationMessage = ref<string | null>(null);
  const isTransitioning = ref<boolean>(false);
  let notificationTimer: ReturnType<typeof setTimeout> | null = null;
  let transitionTimer: ReturnType<typeof setTimeout> | null = null;

  function loadStateFromStorage() {
    try {
      const savedIndex = localStorage.getItem(STORAGE_INDEX_KEY);

      if (savedIndex !== null && Number.isFinite(Number(savedIndex))) {
        currentIndex.value = Math.max(0, Math.trunc(Number(savedIndex)) % WORKOUT_PROGRAMS.length);
      } else {
        currentIndex.value = 0;
        localStorage.setItem(STORAGE_INDEX_KEY, '0');
      }
    } catch (error) {
      console.warn('Не вдалося завантажити збережену програму тренування.', error);
      currentIndex.value = 0;
    }
  }

  function saveStateToStorage(index: number) {
    try {
      localStorage.setItem(STORAGE_INDEX_KEY, String(index));
    } catch (error) {
      console.warn('Не вдалося зберегти програму тренування.', error);
    }
  }

  function finishDay() {
    isTransitioning.value = true;

    const nextIndex = (currentIndex.value + 1) % WORKOUT_PROGRAMS.length;
    currentIndex.value = nextIndex;
    saveStateToStorage(nextIndex);

    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    notificationMessage.value = 'День завершено — наступне тренування готове';
    notificationTimer = setTimeout(() => {
      notificationMessage.value = null;
    }, 4000);

    if (transitionTimer) {
      clearTimeout(transitionTimer);
    }
    transitionTimer = setTimeout(() => {
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

  const formattedProgramNumber = computed<string>(() => {
    const num = currentProgram.value.cycleNumber;
    return String(num).padStart(2, '0');
  });

  const todayDateInfo = computed(() => {
    return formatUkrainianDate(new Date());
  });

  onMounted(() => {
    loadStateFromStorage();
  });

  onUnmounted(() => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    if (transitionTimer) {
      clearTimeout(transitionTimer);
    }
  });

  return {
    currentIndex,
    currentProgram,
    nextProgram,
    formattedProgramNumber,
    totalProgramsCount: WORKOUT_PROGRAMS.length,
    todayDateInfo,
    notificationMessage,
    isTransitioning,
    finishDay,
  };
}
