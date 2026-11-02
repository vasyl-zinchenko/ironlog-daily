import type { Exercise, MuscleId } from './exercise';

export interface WorkoutProgram {
  id: string;
  cycleNumber: number; // 1 to 12
  title: string;
  subtitle: string;
  emphasis: string;
  approxMinutes: number;
  muscleGroupsText: string;
  activeMuscles: MuscleId[];
  exercises: Exercise[];
  cycleVariationNotice?: string;
}

export interface DailyProgramState {
  currentIndex: number; // 0 to 11
  lastDateString: string; // YYYY-MM-DD
  lastUpdatedTimestamp: number;
}

