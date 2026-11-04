<script setup lang="ts">
import { ref } from 'vue';
import { Check, ChevronDown, ChevronUp, Dumbbell } from 'lucide-vue-next';
import type { Exercise } from '../../types/exercise';
import ExercisePhotos from './ExercisePhotos.vue';
import MuscleMap from './MuscleMap.vue';
import ExerciseDetails from './ExerciseDetails.vue';
import AlternativeExercises from './AlternativeExercises.vue';

defineProps<{
  exercise: Exercise;
  orderIndex: number;
  isCompleted: boolean;
}>();

const emit = defineEmits<{
  (event: 'toggle-complete'): void;
}>();

const isExpanded = ref(false);

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <article
    class="exercise-card"
    :class="{ 'card-open': isExpanded, 'card-completed': isCompleted }"
  >
    <header class="card-header-bar">
      <button
        type="button"
        class="exercise-summary-button"
        :aria-expanded="isExpanded"
        :aria-controls="`exercise-details-${exercise.id}`"
        @click="toggleExpand"
      >
        <div class="header-left">
          <span class="order-num">{{ String(orderIndex).padStart(2, '0') }}</span>
          <div class="title-meta-wrap">
            <span class="exercise-name">{{ exercise.name }}</span>
            <span class="muscles-snippet">{{ exercise.targetMusclesText }}</span>
          </div>
        </div>

        <span class="header-right">
          <span class="sets-reps-pill">
            <span class="sets-count">{{ exercise.sets }}</span>
            <span class="times-symb">×</span>
            <span class="reps-range">{{ exercise.reps }}</span>
          </span>
          <component :is="isExpanded ? ChevronUp : ChevronDown" :size="18" class="toggle-icon" />
        </span>
      </button>

      <label class="completion-toggle" :class="{ 'is-checked': isCompleted }">
        <input
          type="checkbox"
          :checked="isCompleted"
          :aria-label="`Позначити вправу «${exercise.name}» як виконану`"
          @change="emit('toggle-complete')"
        />
        <span class="completion-checkbox" aria-hidden="true">
          <Check :size="15" :stroke-width="3" />
        </span>
        <span class="completion-label">{{ isCompleted ? 'Виконано' : 'Виконати' }}</span>
      </label>
    </header>

    <div
      v-if="isExpanded"
      :id="`exercise-details-${exercise.id}`"
      class="card-accordion-body"
    >
      <!-- Equipment Bar -->
      <div class="equipment-meta-strip">
        <Dumbbell :size="14" class="strip-icon" />
        <span>Необхідний інвентар: <strong>{{ exercise.equipment }}</strong></span>
      </div>

      <ExercisePhotos
        :illustration-id="exercise.illustrationId"
        :name="exercise.name"
      />

      <!-- 2. Dual Anatomical Human Body Map -->
      <MuscleMap
        :primary-muscle="exercise.primaryMuscle"
        :secondary-muscles="exercise.secondaryMuscles"
      />

      <!-- 3. Key Technique, Cues & Mistakes -->
      <ExerciseDetails :technique="exercise.technique" />

      <!-- 4. Practical Alternatives -->
      <AlternativeExercises :alternatives="exercise.alternatives" />
    </div>
  </article>
</template>

<style scoped>
.exercise-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.05);
}

.exercise-card:hover {
  border-color: #BAE6FD;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.08);
}

.exercise-card.card-open {
  border-color: #0284C7;
  background: #FFFFFF;
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.12);
}

.exercise-card.card-completed {
  background: var(--completed-surface);
  border-color: var(--completed-border);
  box-shadow: inset 4px 0 0 #5D9A6B, 0 4px 14px rgba(41, 98, 54, 0.1);
}

.card-completed .card-header-bar {
  background: var(--completed-surface);
}

.card-completed .card-accordion-body {
  background: var(--completed-surface-hover);
}

.card-completed .exercise-name {
  color: #28643A;
}

.card-header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 10px 16px;
  background: #FFFFFF;
}

.exercise-summary-button {
  min-width: 0;
  flex: 1;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border: 0;
  background: transparent;
  cursor: pointer;
  user-select: none;
  text-align: left;
  font: inherit;
}

.exercise-summary-button:hover {
  border-radius: 8px;
  background: #F8FBFE;
}

.exercise-summary-button:hover .exercise-name {
  color: #0284C7;
}

.exercise-summary-button:focus-visible,
.completion-toggle:focus-within {
  outline: 2px solid #0284C7;
  outline-offset: 3px;
  border-radius: 6px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.order-num {
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 800;
  color: #0284C7;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.title-meta-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.exercise-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #0F172A;
  line-height: 1.3;
}

.muscles-snippet {
  font-size: 0.76rem;
  color: #475569;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.header-right,
.sets-reps-pill {
  display: inline-flex;
  align-items: center;
}

.sets-reps-pill {
  background: #F0F7FD;
  border: 1px solid #BAE6FD;
  border-radius: 9px;
  padding: 5px 9px;
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 800;
  color: #0369A1;
}

.completion-toggle {
  position: relative;
  flex-shrink: 0;
  min-width: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #64748B;
  cursor: pointer;
  font-size: 0.62rem;
  font-weight: 700;
}

.completion-toggle input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.completion-checkbox {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border: 2px solid #94A3B8;
  border-radius: 7px;
  background: #FFFFFF;
  color: transparent;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.completion-toggle.is-checked {
  color: #15803D;
}

.completion-toggle.is-checked .completion-checkbox {
  border-color: #287A3C;
  background: #287A3C;
  color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(40, 122, 60, 0.16);
}

.times-symb {
  color: #7DD3FC;
  font-size: 0.75rem;
}

.toggle-icon {
  color: #64748B;
  transition: transform 0.2s;
}

.card-open .toggle-icon {
  color: #0284C7;
}

.card-accordion-body {
  border-top: 1px solid #E0F2FE;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #F8FBFE;
  animation: slideDown 0.22s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.equipment-meta-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #334155;
  background: #FFFFFF;
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid #BAE6FD;
}

.strip-icon {
  color: #0284C7;
}

.equipment-meta-strip strong {
  color: #0F172A;
}

@media (prefers-reduced-motion: reduce) {
  .exercise-card,
  .completion-checkbox {
    transition: none;
  }
}

@media (max-width: 420px) {
  .card-header-bar {
    gap: 5px;
    padding-left: 12px;
    padding-right: 8px;
  }

  .header-right {
    gap: 5px;
  }

  .sets-reps-pill {
    padding: 4px 6px;
  }

  .completion-toggle {
    min-width: 48px;
  }

  .completion-label {
    font-size: 0.58rem;
  }
}
</style>
