import { ref } from 'vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { useExerciseProgress } from './useExerciseProgress';

describe('useExerciseProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves completed exercises and restores them when returning to a program', () => {
    const programId = ref('program_01');
    const progress = useExerciseProgress(programId);

    progress.toggleExercise('bench_press');
    expect(progress.completedExerciseIds.value).toEqual(['bench_press']);

    programId.value = 'program_02';
    expect(progress.completedExerciseIds.value).toEqual([]);

    programId.value = 'program_01';
    expect(progress.completedExerciseIds.value).toEqual(['bench_press']);
  });

  it('clears only the current program progress when the day is finished', () => {
    const programId = ref('program_01');
    const progress = useExerciseProgress(programId);
    progress.toggleExercise('bench_press');
    progress.clearProgress();

    expect(progress.completedExerciseIds.value).toEqual([]);
    expect(localStorage.getItem('ironlog_completed_exercises_program_01')).toBe('[]');
  });
});
