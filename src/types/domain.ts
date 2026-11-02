export type UserId = string;
export type WorkoutType = 'A' | 'B' | 'C' | 'D';
export type SessionStatus = 'in_progress' | 'completed' | 'partially_completed';
export type ExerciseStatus = 'completed' | 'skipped';

export interface ExerciseAlternative {
  id: string;
  name: string;
  instruction: string;
  equipment: string;
  sets: number;
  reps: string;
  type: 'зал' | 'зал / гантелі' | 'мінімальне обладнання' | 'без обладнання';
}

export interface ExerciseTemplate {
  id: string;
  name: string;
  targetMuscles: string;
  sets: number;
  reps: string;
  focus: string;
  instruction: string;
  altName?: string;
  alternatives: ExerciseAlternative[];
}

export interface WorkoutTemplate {
  type: WorkoutType;
  title: string;
  muscleGroups: string;
  emphasis: string;
  approxDurationMinutes: number;
  exercises: ExerciseTemplate[];
}

export interface ProgramPhase {
  id: string;
  label: string;
  months: string;
  focus: string;
  startMonth: number;
  endMonth: number;
  details: string[];
}

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  displayName?: string;
  email?: string;
  age?: number;
  birthDate?: string;
  height?: number;
  heightCm?: number;
  weight?: number;
  bench?: number;
  legPress?: number;
  hipThrust?: number;
  pullUp?: number;
  biceps?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProgramState {
  id: string;
  userId: string;
  currentWorkoutCode: WorkoutType;
  currentPhase: number;
  programStartDate: string;
  updatedAt: string;
}

export interface WorkoutSet {
  id: string;
  userId: string;
  exerciseLogId: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  rir: number;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface WorkoutExerciseLog {
  id: string;
  userId: string;
  sessionId: string;
  originalExerciseId: string;
  originalExerciseNameSnapshot: string;
  actualExerciseName: string;
  alternativeExerciseId?: string | null;
  orderIndex: number;
  status: ExerciseStatus;
  notes: string;
  sets?: WorkoutSet[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface ExercisePreference {
  id: string;
  userId: string;
  exerciseId: string;
  preferredAlternativeId?: string | null;
  lastUsedWeight: number;
  updatedAt: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutCode: WorkoutType;
  startedAt: string;
  completedAt?: string | null;
  status: SessionStatus;
  durationSeconds: number;
  notes: string;
  exerciseLogs?: WorkoutExerciseLog[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;

  // Backward compatibility fields
  date?: string;
  workoutType?: WorkoutType;
  duration?: number;
  exercises?: LegacyExerciseLog[];
}

export interface LegacyExerciseLog {
  exerciseId: string;
  name: string;
  sets: number;
  weight: number;
  reps: number;
  rir: number;
  notes: string;
}

export type ExerciseLog = LegacyExerciseLog;

export interface BodyMetric {
  id: string;
  userId: string;
  name: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  metricId: string;
  metricNameSnapshot: string;
  value: number;
  unit: string;
  measuredAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface NoteItem {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type SyncEntityType =
  | 'profile'
  | 'program_state'
  | 'workout_session'
  | 'workout_exercise_log'
  | 'workout_set'
  | 'exercise_preference'
  | 'body_metric'
  | 'body_measurement'
  | 'note';

export type SyncOperation = 'insert' | 'update' | 'delete';

export interface SyncQueueItem {
  id: string;
  userId: string;
  entityType: SyncEntityType;
  entityId: string;
  operation: SyncOperation;
  payload: Record<string, unknown>;
  createdAt: string;
  retryCount: number;
  status: 'pending' | 'processing' | 'failed' | 'synced';
  errorMessage?: string;
}

export interface ActiveWorkoutDraft {
  id: string;
  userId: string;
  workoutCode: WorkoutType;
  startedAt: string;
  elapsedSeconds: number;
  notes: string;
  exercises: {
    exerciseLogId: string;
    originalExerciseId: string;
    originalExerciseNameSnapshot: string;
    actualExerciseName: string;
    alternativeExerciseId?: string | null;
    orderIndex: number;
    status: ExerciseStatus;
    notes: string;
    sets: {
      id: string;
      setNumber: number;
      weightKg: number;
      reps: number;
      rir: number;
      isCompleted: boolean;
      completedAt?: string;
    }[];
  }[];
  updatedAt: string;
}

export interface AppSettings {
  id: 'app';
  currentUserId: UserId;
  programStartDate: string;
  currentPhaseIndex: number;
  latestWorkoutType: WorkoutType;
  notificationsEnabled: boolean;
  deloadMode: boolean;
}

export interface ImportPayload {
  version?: number;
  exportedAt?: string;
  profiles?: UserProfile[];
  programStates?: ProgramState[];
  sessions?: WorkoutSession[];
  exerciseLogs?: WorkoutExerciseLog[];
  workoutSets?: WorkoutSet[];
  exercisePreferences?: ExercisePreference[];
  bodyMetrics?: BodyMetric[];
  bodyMeasurements?: BodyMeasurement[];
  notes?: NoteItem[];
  settings?: AppSettings[];
}
