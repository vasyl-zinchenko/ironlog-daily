import type { MuscleId } from '../types/exercise';

export interface MuscleInfo {
  id: MuscleId;
  name: string;
  category: 'upper' | 'lower' | 'core' | 'full';
  view: 'front' | 'back' | 'both';
}

export const MUSCLE_GROUPS: Record<MuscleId, MuscleInfo> = {
  chest: {
    id: 'chest',
    name: 'Грудні м’язи',
    category: 'upper',
    view: 'front',
  },
  lats: {
    id: 'lats',
    name: 'Найширші м’язи спини',
    category: 'upper',
    view: 'back',
  },
  upper_back: {
    id: 'upper_back',
    name: 'Верх спини та трапеція',
    category: 'upper',
    view: 'back',
  },
  shoulders: {
    id: 'shoulders',
    name: 'Дельтоподібні м’язи (плечі)',
    category: 'upper',
    view: 'both',
  },
  biceps: {
    id: 'biceps',
    name: 'Двоголовий м’яз (біцепс)',
    category: 'upper',
    view: 'front',
  },
  triceps: {
    id: 'triceps',
    name: 'Триголовий м’яз (трицепс)',
    category: 'upper',
    view: 'back',
  },
  quads: {
    id: 'quads',
    name: 'Квадрицепси (передня поверхня стегна)',
    category: 'lower',
    view: 'front',
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Задня поверхня стегна',
    category: 'lower',
    view: 'back',
  },
  glutes: {
    id: 'glutes',
    name: 'Сідничні м’язи',
    category: 'lower',
    view: 'back',
  },
  calves: {
    id: 'calves',
    name: 'Литки (литкові та камбалоподібні)',
    category: 'lower',
    view: 'back',
  },
  abs: {
    id: 'abs',
    name: 'М’язи кора та прес',
    category: 'core',
    view: 'front',
  },
  mobility: {
    id: 'mobility',
    name: 'Мобільність суглобів та зв’язки',
    category: 'full',
    view: 'both',
  },
};

