export type MuscleId =
  | 'chest'
  | 'lats'
  | 'upper_back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'abs'
  | 'mobility';

export interface ExerciseAlternative {
  name: string;
  equipment: string;
  reason: string;
}

export interface ExerciseTechnique {
  shortInstruction: string;
  cues: string[];
  focus: string;
  commonMistakes: string[];
}

export interface Exercise {
  id: string;
  name: string;
  targetMusclesText: string;
  primaryMuscle: MuscleId;
  secondaryMuscles: MuscleId[];
  sets: number;
  reps: string;
  equipment: string;
  technique: ExerciseTechnique;
  alternatives: ExerciseAlternative[];
  illustrationId: string;
}

