import { ref, watch, type Ref } from 'vue';

const STORAGE_KEY_PREFIX = 'ironlog_completed_exercises_';

export function useExerciseProgress(programId: Ref<string>) {
  const completedExerciseIds = ref<string[]>([]);

  function storageKey(id: string) {
    return `${STORAGE_KEY_PREFIX}${id}`;
  }

  function loadProgress(id: string) {
    let savedProgress: string | null;
    try {
      savedProgress = localStorage.getItem(storageKey(id));
    } catch (error) {
      console.warn('Не вдалося завантажити позначки виконаних вправ.', error);
      completedExerciseIds.value = [];
      return;
    }

    if (!savedProgress) {
      completedExerciseIds.value = [];
      return;
    }

    try {
      const parsedProgress: unknown = JSON.parse(savedProgress);
      completedExerciseIds.value = Array.isArray(parsedProgress)
        ? parsedProgress.filter((exerciseId): exerciseId is string => typeof exerciseId === 'string')
        : [];
    } catch (error) {
      console.warn('Не вдалося розібрати збережені позначки вправ.', error);
      completedExerciseIds.value = [];
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(storageKey(programId.value), JSON.stringify(completedExerciseIds.value));
    } catch (error) {
      console.warn('Не вдалося зберегти позначки виконаних вправ.', error);
    }
  }

  watch(programId, loadProgress, { immediate: true, flush: 'sync' });
  watch(completedExerciseIds, saveProgress, { deep: true, flush: 'sync' });

  function toggleExercise(exerciseId: string) {
    completedExerciseIds.value = completedExerciseIds.value.includes(exerciseId)
      ? completedExerciseIds.value.filter((id) => id !== exerciseId)
      : [...completedExerciseIds.value, exerciseId];
  }

  function clearProgress() {
    completedExerciseIds.value = [];
  }

  return {
    completedExerciseIds,
    toggleExercise,
    clearProgress,
  };
}
