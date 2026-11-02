<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronUp, Dumbbell } from 'lucide-vue-next';
import type { Exercise } from '../../types/exercise';
import ExerciseIllustration from './ExerciseIllustration.vue';
import MuscleMap from './MuscleMap.vue';
import ExerciseDetails from './ExerciseDetails.vue';
import AlternativeExercises from './AlternativeExercises.vue';

defineProps<{
  exercise: Exercise;
  orderIndex: number;
}>();

const isExpanded = ref(false);

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <article
    class="exercise-card"
    :class="{ 'card-open': isExpanded }"
  >
    <!-- Collapsed Header Row (Tap to expand/collapse) -->
    <header
      class="card-header-bar"
      tabindex="0"
      role="button"
      :aria-expanded="isExpanded"
      @click="toggleExpand"
      @keydown.enter.space.prevent="toggleExpand"
    >
      <div class="header-left">
        <span class="order-num">{{ String(orderIndex).padStart(2, '0') }}</span>
        <div class="title-meta-wrap">
          <h4 class="exercise-name">{{ exercise.name }}</h4>
          <span class="muscles-snippet">{{ exercise.targetMusclesText }}</span>
        </div>
      </div>

      <div class="header-right">
        <div class="sets-reps-pill">
          <span class="sets-count">{{ exercise.sets }}</span>
          <span class="times-symb">×</span>
          <span class="reps-range">{{ exercise.reps }}</span>
        </div>
        <component :is="isExpanded ? ChevronUp : ChevronDown" :size="18" class="toggle-icon" />
      </div>
    </header>

    <!-- EXPANDED DETAILED ACCORDION BODY -->
    <div v-if="isExpanded" class="card-accordion-body">
      <!-- Equipment Bar -->
      <div class="equipment-meta-strip">
        <Dumbbell :size="14" class="strip-icon" />
        <span>Необхідний інвентар: <strong>{{ exercise.equipment }}</strong></span>
      </div>

      <!-- 1. Movement Schematic Illustration -->
      <ExerciseIllustration
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

.card-header-bar {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  background: #FFFFFF;
  transition: background 0.15s ease;
}

.card-header-bar:hover {
  background: #F8FBFE;
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
</style>
