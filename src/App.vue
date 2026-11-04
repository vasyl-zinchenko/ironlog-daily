<script setup lang="ts">
import { computed, ref } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import PwaInstallBanner from './components/common/PwaInstallBanner.vue';
import WorkoutHero from './components/workout/WorkoutHero.vue';
import WorkoutExerciseCard from './components/workout/WorkoutExerciseCard.vue';
import FinishDayButton from './components/common/FinishDayButton.vue';
import FinishDayConfirmationModal from './components/workout/FinishDayConfirmationModal.vue';
import { useDailyProgram } from './composables/useDailyProgram';
import { useExerciseProgress } from './composables/useExerciseProgress';

const {
  currentProgram,
  nextProgram,
  formattedProgramNumber,
  totalProgramsCount,
  todayDateInfo,
  notificationMessage,
  isTransitioning,
  finishDay,
} = useDailyProgram();

const {
  completedExerciseIds,
  toggleExercise,
  clearProgress,
} = useExerciseProgress(computed(() => currentProgram.value.id));

const isConfirmModalOpen = ref(false);

const completedExerciseCount = computed(() => completedExerciseIds.value.length);
const formattedNextProgramNumber = computed(() => {
  return String(nextProgram.value.cycleNumber).padStart(2, '0');
});

function openFinishDayModal() {
  isConfirmModalOpen.value = true;
}

function closeFinishDayModal() {
  isConfirmModalOpen.value = false;
}

function handleConfirmFinishDay() {
  isConfirmModalOpen.value = false;
  clearProgress();
  finishDay();
}
</script>

<template>
  <div class="daily-app-shell">
    <AppHeader :today-date-info="todayDateInfo" />

    <!-- Main Scrollable Workout Stage -->
    <main class="daily-content-stage">
      <!-- PWA Install Banner -->
      <PwaInstallBanner />

      <!-- Smooth transition between workout programs -->
      <transition name="fade" mode="out-in">
        <div :key="currentProgram.id" class="program-view-wrapper" :class="{ 'is-swapping': isTransitioning }">
          <!-- 2. Master Workout Editorial Hero Card -->
          <WorkoutHero
            :program="currentProgram"
            :program-number-formatted="formattedProgramNumber"
            :total-count="totalProgramsCount"
          />

          <!-- 3. Exercises Section Header -->
          <section class="exercises-section" aria-label="Список вправ програми">
            <div class="section-title-strip">
              <div class="title-left">
                <span class="section-pre-tag">ПЛАН ВПРАВ</span>
                <h3 class="section-heading">Вправи тренування</h3>
              </div>
              <span class="count-pill">
                {{ completedExerciseCount }} / {{ currentProgram.exercises.length }} виконано
              </span>
            </div>

            <p class="section-user-hint">
              Позначайте виконані вправи галочками. Натисніть назву вправи, щоб побачити фото руху та підказки.
            </p>

            <!-- Expandable exercise cards with saved completion status -->
            <div class="exercise-cards-list">
              <WorkoutExerciseCard
                v-for="(exercise, idx) in currentProgram.exercises"
                :key="exercise.id"
                :exercise="exercise"
                :order-index="idx + 1"
                :is-completed="completedExerciseIds.includes(exercise.id)"
                @toggle-complete="toggleExercise(exercise.id)"
              />
            </div>
          </section>

          <FinishDayButton
            :is-updating="isTransitioning"
            :notification-message="notificationMessage"
            :completed-count="completedExerciseCount"
            :total-count="currentProgram.exercises.length"
            @finish="openFinishDayModal"
          />
        </div>
      </transition>

      <!-- Minimalist Editorial Footer -->
      <footer class="app-footer">
        <div class="footer-plate">
          <span class="footer-brand">IRONLOG DAILY</span>
          <span class="footer-dot">•</span>
          <span class="footer-note">100% Автономний PWA • Цикл змінюється після завершення дня</span>
        </div>
      </footer>
    </main>

    <FinishDayConfirmationModal
      :is-open="isConfirmModalOpen"
      :current-program="currentProgram"
      :next-program="nextProgram"
      :current-number-formatted="formattedProgramNumber"
      :next-number-formatted="formattedNextProgramNumber"
      @confirm="handleConfirmFinishDay"
      @cancel="closeFinishDayModal"
    />
  </div>
</template>

<style scoped>
.daily-app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--app-surface);
}

.daily-content-stage {
  flex: 1;
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  background: var(--stage-surface);
}

.program-view-wrapper {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.program-view-wrapper.is-swapping {
  opacity: 0.6;
  transform: scale(0.99);
}

.exercises-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
}

.section-title-strip {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--border-accent);
  padding-bottom: 8px;
}

.title-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.section-pre-tag {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--accent);
  text-transform: uppercase;
}

.section-heading {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-strong);
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

.count-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-text);
  background: var(--accent-surface);
  border: 1px solid var(--border-accent);
  padding: 3px 9px;
  border-radius: 999px;
}

.section-user-hint {
  margin: 2px 0 8px;
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.exercise-cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.app-footer {
  margin-top: 36px;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
  text-align: center;
}

.footer-plate {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  color: var(--text-muted);
  flex-wrap: wrap;
  justify-content: center;
}

.footer-brand {
  font-weight: 800;
  color: var(--accent-text);
  letter-spacing: 0.06em;
}

.footer-dot {
  color: var(--accent-soft);
}

.footer-note {
  color: var(--text-muted);
}

@media (max-width: 440px) {
  .daily-content-stage {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
