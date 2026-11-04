import type { WorkoutProgram } from '../types/workout';
import { EXERCISE_LIBRARY } from './exercises';

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  // 01
  {
    id: 'program_01',
    cycleNumber: 1,
    title: 'Сила грудей та квадрицепсів',
    subtitle: 'Програма 01 // Сила та об’єм',
    emphasis: 'Груди та квадрицепси (базовий синергетичний спліт)',
    approxMinutes: 38,
    muscleGroupsText: 'Грудні м’язи • Квадрицепси • Плечі • Трицепс',
    activeMuscles: ['chest', 'quads', 'shoulders', 'triceps'],
    exercises: [
      { ...EXERCISE_LIBRARY.bench_press, sets: 3, reps: '6–8' },
      { ...EXERCISE_LIBRARY.leg_press, sets: 3, reps: '10–12' },
      { ...EXERCISE_LIBRARY.incline_dumbbell_press, sets: 2, reps: '10–12' },
      { ...EXERCISE_LIBRARY.lateral_raises, sets: 2, reps: '12–20' },
      { ...EXERCISE_LIBRARY.overhead_triceps_extension, sets: 2, reps: '10–15' },
    ],
    cycleVariationNotice: 'У 2-му колі циклу замініть жим штанги на жим гантелей для глибшого розтягнення.',
  },

  // 02
  {
    id: 'program_02',
    cycleNumber: 2,
    title: 'Тяга для спини та біцепса',
    subtitle: 'Програма 02 // Тягова щільність',
    emphasis: 'Спина, біцепс, задня дельта та гомілки',
    approxMinutes: 36,
    muscleGroupsText: 'Найширші спини • Трапеція • Біцепс • Литки',
    activeMuscles: ['lats', 'upper_back', 'biceps', 'calves', 'shoulders'],
    exercises: [
      { ...EXERCISE_LIBRARY.pullups, sets: 3, reps: '5–10' },
      { ...EXERCISE_LIBRARY.seated_cable_row, sets: 3, reps: '8–12' },
      { ...EXERCISE_LIBRARY.biceps_machine, sets: 2, reps: '10–15' },
      { ...EXERCISE_LIBRARY.rear_delt_fly, sets: 2, reps: '12–20' },
      { ...EXERCISE_LIBRARY.calf_machine, sets: 3, reps: '12–20' },
    ],
    cycleVariationNotice: 'У наступному циклі спробуйте паралельний вузький хват на підтягуваннях.',
  },

  // 03
  {
    id: 'program_03',
    cycleNumber: 3,
    title: 'Жимовий об’єм: плечі та груди',
    subtitle: 'Програма 03 // Жимовий об’єм',
    emphasis: 'Плечі, груди та помірне включення ніг',
    approxMinutes: 38,
    muscleGroupsText: 'Дельти • Грудні м’язи • Квадрицепси • Кора',
    activeMuscles: ['shoulders', 'chest', 'quads', 'triceps'],
    exercises: [
      { ...EXERCISE_LIBRARY.overhead_dumbbell_press, sets: 3, reps: '8–12' },
      { ...EXERCISE_LIBRARY.flat_dumbbell_press, sets: 2, reps: '10–15' },
      { ...EXERCISE_LIBRARY.leg_press, sets: 3, reps: '12–15' },
      { ...EXERCISE_LIBRARY.pushup_board, sets: 2, reps: '10–20' },
      { ...EXERCISE_LIBRARY.lateral_raises, sets: 2, reps: '12–20' },
    ],
    cycleVariationNotice: 'Можна чергувати жим гантелей стоячи з гирею для перевірки стабілізації кора.',
  },

  // 04
  {
    id: 'program_04',
    cycleNumber: 4,
    title: 'Спина та задній ланцюг',
    subtitle: 'Програма 04 // Задня лінія тіла',
    emphasis: 'Широкі спини, сідниці, біцепс стегна та руки',
    approxMinutes: 40,
    muscleGroupsText: 'Спина • Сідниці • Біцепс стегна • Передпліччя',
    activeMuscles: ['lats', 'glutes', 'hamstrings', 'biceps'],
    exercises: [
      { ...EXERCISE_LIBRARY.one_arm_dumbbell_row, sets: 3, reps: '10–12' },
      { ...EXERCISE_LIBRARY.pullups, sets: 2, reps: '6–10' },
      { ...EXERCISE_LIBRARY.hip_thrust, sets: 3, reps: '8–12' },
      { ...EXERCISE_LIBRARY.sliding_leg_curls, sets: 2, reps: '10–15' },
      { ...EXERCISE_LIBRARY.hammer_curls, sets: 2, reps: '10–15' },
    ],
    cycleVariationNotice: 'У 2-му циклі замініть рушник/слайдери на румунську тягу з парою важких гир.',
  },

  // 05
  {
    id: 'program_05',
    cycleNumber: 5,
    title: 'Об’єм грудей, біцепса та трицепса',
    subtitle: 'Програма 05 // Грудний та ручний памп',
    emphasis: 'М’язовий об’єм грудей, біцепса та трицепса',
    approxMinutes: 37,
    muscleGroupsText: 'Груди • Біцепс • Трицепс • Бічні дельти',
    activeMuscles: ['chest', 'biceps', 'triceps', 'shoulders'],
    exercises: [
      { ...EXERCISE_LIBRARY.bench_press_paused, sets: 3, reps: '8–10' },
      { ...EXERCISE_LIBRARY.incline_dumbbell_press, sets: 2, reps: '10–15' },
      { ...EXERCISE_LIBRARY.biceps_machine, sets: 3, reps: '10–15' },
      { ...EXERCISE_LIBRARY.overhead_triceps_extension, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.lateral_raises, sets: 2, reps: '15–20' },
    ],
    cycleVariationNotice: 'Виконуйте біцепс та трицепс як антагоністичний суперсет для максимального пампу.',
  },

  // 06
  {
    id: 'program_06',
    cycleNumber: 6,
    title: 'Фундамент: ноги та спина',
    subtitle: 'Програма 06 // Об’ємний фундамент',
    emphasis: 'Високоповторні ноги, литки та товщина спини',
    approxMinutes: 38,
    muscleGroupsText: 'Квадрицепси • Сідниці • Литки • Спина',
    activeMuscles: ['quads', 'calves', 'lats', 'glutes'],
    exercises: [
      { ...EXERCISE_LIBRARY.leg_press, sets: 3, reps: '12–15' },
      { ...EXERCISE_LIBRARY.calf_machine, sets: 3, reps: '15–20' },
      { ...EXERCISE_LIBRARY.seated_cable_row, sets: 3, reps: '10–15' },
      { ...EXERCISE_LIBRARY.one_arm_dumbbell_row, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.glute_bridge, sets: 2, reps: '12–15' },
    ],
    cycleVariationNotice: 'На жимі ногами поставте стопи трохи вище для посилення навантаження на сідниці.',
  },

  // 07
  {
    id: 'program_07',
    cycleNumber: 7,
    title: 'Метаболічний памп усього тіла',
    subtitle: 'Програма 07 // Все тіло у суперсетах',
    emphasis: 'Збалансоване помірне навантаження на всі головні групи',
    approxMinutes: 35,
    muscleGroupsText: 'Груди • Спина • Ноги • Руки • Литки',
    activeMuscles: ['chest', 'lats', 'quads', 'calves', 'biceps', 'triceps'],
    exercises: [
      { ...EXERCISE_LIBRARY.pushup_board, sets: 2, reps: '12–20' },
      { ...EXERCISE_LIBRARY.seated_cable_row, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.leg_press, sets: 2, reps: '15–20' },
      { ...EXERCISE_LIBRARY.calf_machine, sets: 2, reps: '15–20' },
      { ...EXERCISE_LIBRARY.biceps_machine, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.overhead_triceps_extension, sets: 2, reps: '12–15' },
    ],
    cycleVariationNotice: 'Руки (вправи 5 і 6) виконуйте одним безперервним суперсетом для економії часу.',
  },

  // 08
  {
    id: 'program_08',
    cycleNumber: 8,
    title: 'Мобільність, кора та розвантаження',
    subtitle: 'Програма 08 // Відновлення та суглоби',
    emphasis: 'Мобільність, зняття м’язового спазму та активне розвантаження',
    approxMinutes: 24,
    muscleGroupsText: 'Суглоби • Грудний відділ • Мобільність таза • Кора',
    activeMuscles: ['mobility', 'abs', 'glutes', 'shoulders'],
    exercises: [
      { ...EXERCISE_LIBRARY.active_mobility_flow, sets: 3, reps: '8–10 рухів' },
      { ...EXERCISE_LIBRARY.plank_core, sets: 3, reps: '45–60 с' },
      { ...EXERCISE_LIBRARY.glute_bridge, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.pushup_board, sets: 2, reps: '10–12' },
    ],
    cycleVariationNotice: 'День легкого кардіо та суглобової гімнастики. Уникайте відмови м’язів.',
  },

  // 09
  {
    id: 'program_09',
    cycleNumber: 9,
    title: 'Силовий верх тіла та прес',
    subtitle: 'Програма 09 // Силовий верх тіла',
    emphasis: 'Силовий фокус на груди, верх спини та монолітний прес',
    approxMinutes: 38,
    muscleGroupsText: 'Груди • Найширші • Плечі • Прес',
    activeMuscles: ['chest', 'lats', 'shoulders', 'abs'],
    exercises: [
      { ...EXERCISE_LIBRARY.bench_press, sets: 3, reps: '6–8' },
      { ...EXERCISE_LIBRARY.seated_cable_row, sets: 3, reps: '6–8' },
      { ...EXERCISE_LIBRARY.overhead_dumbbell_press, sets: 2, reps: '8–10' },
      { ...EXERCISE_LIBRARY.pullups, sets: 2, reps: '6–8' },
      { ...EXERCISE_LIBRARY.plank_core, sets: 3, reps: '45–60 с' },
    ],
    cycleVariationNotice: 'Важкий синергетичний день. Додайте 2 хвилини відпочинку між основними підходами.',
  },

  // 10
  {
    id: 'program_10',
    cycleNumber: 10,
    title: 'Ноги та 3D-плечі',
    subtitle: 'Програма 10 // Ноги та 3D-плечі',
    emphasis: 'Квадрицепси, сідниці, литки та середня/задня дельти',
    approxMinutes: 39,
    muscleGroupsText: 'Ноги • Сідниці • Литки • Середня та задня дельти',
    activeMuscles: ['quads', 'glutes', 'calves', 'shoulders'],
    exercises: [
      { ...EXERCISE_LIBRARY.leg_press, sets: 3, reps: '10–12' },
      { ...EXERCISE_LIBRARY.hip_thrust, sets: 3, reps: '10–12' },
      { ...EXERCISE_LIBRARY.calf_machine, sets: 3, reps: '12–15' },
      { ...EXERCISE_LIBRARY.lateral_raises, sets: 3, reps: '12–15' },
      { ...EXERCISE_LIBRARY.rear_delt_fly, sets: 2, reps: '15–20' },
    ],
    cycleVariationNotice: 'На другому колі зробіть акцент на контрольоване опускання на жимі ногами (3 секунди).',
  },

  // 11
  {
    id: 'program_11',
    cycleNumber: 11,
    title: 'Щільність спини, грудей і рук',
    subtitle: 'Програма 11 // Висока щільність верху',
    emphasis: 'М’язова щільність верху тіла без осьового навантаження',
    approxMinutes: 37,
    muscleGroupsText: 'Груди • Спина • Біцепс • Трицепс',
    activeMuscles: ['chest', 'lats', 'biceps', 'triceps'],
    exercises: [
      { ...EXERCISE_LIBRARY.pushup_board, sets: 3, reps: '12–15' },
      { ...EXERCISE_LIBRARY.one_arm_dumbbell_row, sets: 3, reps: '10–12' },
      { ...EXERCISE_LIBRARY.flat_dumbbell_press, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.biceps_machine, sets: 2, reps: '12–15' },
      { ...EXERCISE_LIBRARY.overhead_triceps_extension, sets: 2, reps: '12–15' },
    ],
    cycleVariationNotice: 'Мінімальний відпочинок між підходами (60–75 с) для підтримки високої щільності.',
  },

  // 12
  {
    id: 'program_12',
    cycleNumber: 12,
    title: 'Атлетичний фінал усього тіла',
    subtitle: 'Програма 12 // Фінал макроциклу',
    emphasis: 'Потужне функціональне завершення 12-денного циклу',
    approxMinutes: 38,
    muscleGroupsText: 'Квадрицепси • Спина • Груди • Задній ланцюг • Руки',
    activeMuscles: ['quads', 'lats', 'chest', 'glutes', 'biceps'],
    exercises: [
      { ...EXERCISE_LIBRARY.leg_press, sets: 3, reps: '12–15' },
      { ...EXERCISE_LIBRARY.pullups, sets: 3, reps: '8–10' },
      { ...EXERCISE_LIBRARY.bench_press, sets: 3, reps: '8–10' },
      { ...EXERCISE_LIBRARY.kettlebell_swings, sets: 3, reps: '15' },
      { ...EXERCISE_LIBRARY.hammer_curls, sets: 2, reps: '12–15' },
    ],
    cycleVariationNotice: 'Вітаємо з проходженням повного циклу! Після завершення цього дня цикл почнеться з Програми 01.',
  },
];
