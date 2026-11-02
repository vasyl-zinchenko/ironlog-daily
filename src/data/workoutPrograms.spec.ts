import { describe, expect, it } from 'vitest';
import { WORKOUT_PROGRAMS } from './workoutPrograms';
import { MUSCLE_GROUPS } from './muscleGroups';

describe('Workout Programs Structure & Balance Verification', () => {
  it('contains exactly 12 distinct sequential workout programs', () => {
    expect(WORKOUT_PROGRAMS).toHaveLength(12);

    WORKOUT_PROGRAMS.forEach((prog, idx) => {
      expect(prog.cycleNumber).toBe(idx + 1);
      expect(prog.title).toBeTruthy();
      expect(prog.subtitle).toBeTruthy();
      expect(prog.emphasis).toBeTruthy();
      expect(prog.approxMinutes).toBeGreaterThanOrEqual(20);
      expect(prog.approxMinutes).toBeLessThanOrEqual(45);
    });
  });

  it('each workout program contains 4 to 6 balanced exercises for a 30-40 min session', () => {
    WORKOUT_PROGRAMS.forEach((prog) => {
      expect(prog.exercises.length).toBeGreaterThanOrEqual(4);
      expect(prog.exercises.length).toBeLessThanOrEqual(6);
    });
  });

  it('each exercise has complete technique cues, focus points, common mistakes, and valid muscle IDs', () => {
    const validMuscleIds = Object.keys(MUSCLE_GROUPS);

    WORKOUT_PROGRAMS.forEach((prog) => {
      prog.exercises.forEach((ex) => {
        expect(ex.id).toBeTruthy();
        expect(ex.name).toBeTruthy();
        expect(ex.sets).toBeGreaterThanOrEqual(2);
        expect(ex.sets).toBeLessThanOrEqual(4);
        expect(ex.reps).toBeTruthy();
        expect(ex.equipment).toBeTruthy();

        // Muscle validity
        expect(validMuscleIds).toContain(ex.primaryMuscle);
        ex.secondaryMuscles.forEach((sec) => {
          expect(validMuscleIds).toContain(sec);
        });

        // Technique completeness
        expect(ex.technique.shortInstruction.length).toBeGreaterThan(15);
        expect(ex.technique.cues.length).toBeGreaterThanOrEqual(2);
        expect(ex.technique.focus.length).toBeGreaterThan(10);
        expect(ex.technique.commonMistakes.length).toBeGreaterThanOrEqual(1);

        // Alternatives requirement: at least 2 alternatives for each exercise
        expect(ex.alternatives.length).toBeGreaterThanOrEqual(2);
        ex.alternatives.forEach((alt) => {
          expect(alt.name).toBeTruthy();
          expect(alt.equipment).toBeTruthy();
          expect(alt.reason.length).toBeGreaterThan(10);
        });
      });
    });
  });

  it('provides varied repetition ranges across the workouts (not monotone 3x5)', () => {
    const allReps = new Set<string>();
    WORKOUT_PROGRAMS.forEach((prog) => {
      prog.exercises.forEach((ex) => allReps.add(ex.reps));
    });

    // Expect varied ranges like 6-8, 8-12, 10-15, 12-20, etc.
    expect(allReps.size).toBeGreaterThanOrEqual(5);
    expect(allReps).toContain('6–8');
    expect(allReps).toContain('12–20');
  });

  it('adheres to available equipment without requiring absent specialty machines', () => {
    // Should NOT require deadlift or barbell back squat as quad staple
    WORKOUT_PROGRAMS.forEach((prog) => {
      const exerciseNames = prog.exercises.map((e) => e.name.toLowerCase());
      expect(exerciseNames.some((n) => n.includes('станова тяга'))).toBe(false);
      expect(exerciseNames.some((n) => n.includes('присідання зі штангою'))).toBe(false);
    });
  });
});

