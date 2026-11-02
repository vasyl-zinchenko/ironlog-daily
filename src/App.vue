<script setup lang="ts">
import { computed, ref } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import PwaInstallBanner from './components/common/PwaInstallBanner.vue';
import WorkoutHero from './components/workout/WorkoutHero.vue';
import WorkoutExerciseCard from './components/workout/WorkoutExerciseCard.vue';
import UpdateProgramButton from './components/common/UpdateProgramButton.vue';
import UpdateConfirmationModal from './components/workout/UpdateConfirmationModal.vue';
import { useDailyProgram } from './composables/useDailyProgram';

const {
  currentProgram,
  nextProgram,
  formattedProgramNumber,
  totalProgramsCount,
  todayDateInfo,
  notificationMessage,
  isTransitioning,
  manualAdvance,
  manualRewind,
} = useDailyProgram();

const isConfirmModalOpen = ref(false);

const formattedNextProgramNumber = computed(() => {
  return String(nextProgram.value.cycleNumber).padStart(2, '0');
});

function openUpdateModal() {
  isConfirmModalOpen.value = true;
}

function closeUpdateModal() {
  isConfirmModalOpen.value = false;
}

function handleConfirmUpdate() {
  isConfirmModalOpen.value = false;
  manualAdvance();
}

function handleRewind() {
  manualRewind();
}
</script>

<template>
  <div class="daily-app-shell">
    <!-- 1. Top Header Bar with Update & Rewind Icons -->
    <AppHeader
      :today-date-info="todayDateInfo"
      :is-updating="isTransitioning"
      @request-update="openUpdateModal"
      @request-rewind="handleRewind"
    />

    <!-- Main Scrollable Workout Stage -->
    <main class="daily-content-stage">
      <!-- PWA Install Banner -->
      <PwaInstallBanner />

      <!-- Smooth Transition Wrapper for Daily Program -->
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
              <span class="count-pill">{{ currentProgram.exercises.length }} вправ</span>
            </div>

            <p class="section-user-hint">
              Натисніть на будь-яку вправу, щоб переглянути схему руху, карту м’язів, правила техніки та альтернативи.
            </p>

            <!-- 4. Interactive Expandable Exercise Cards Feed -->
            <div class="exercise-cards-list">
              <WorkoutExerciseCard
                v-for="(exercise, idx) in currentProgram.exercises"
                :key="exercise.id"
                :exercise="exercise"
                :order-index="idx + 1"
              />
            </div>
          </section>

          <!-- 5. Dual Action Controls: Rewind & Update Program -->
          <UpdateProgramButton
            :is-updating="isTransitioning"
            :notification-message="notificationMessage"
            @update="openUpdateModal"
            @rewind="handleRewind"
          />
        </div>
      </transition>

      <!-- Minimalist Editorial Footer -->
      <footer class="app-footer">
        <div class="footer-plate">
          <span class="footer-brand">IRONLOG DAILY</span>
          <span class="footer-dot">•</span>
          <span class="footer-note">100% Автономний PWA • Щоденні програми</span>
        </div>
      </footer>
    </main>

    <!-- Confirmation Modal to Prevent Accidental Program Advancement -->
    <UpdateConfirmationModal
      :is-open="isConfirmModalOpen"
      :current-program="currentProgram"
      :next-program="nextProgram"
      :current-number-formatted="formattedProgramNumber"
      :next-number-formatted="formattedNextProgramNumber"
      @confirm="handleConfirmUpdate"
      @cancel="closeUpdateModal"
    />
  </div>
</template>

<style scoped>
.daily-app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FFFFFF;
}

.daily-content-stage {
  flex: 1;
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F9FE 30%, #ECF5FC 100%);
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
  border-bottom: 1px solid #BAE6FD;
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
  color: #0284C7;
  text-transform: uppercase;
}

.section-heading {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

.count-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: #0369A1;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  padding: 3px 9px;
  border-radius: 999px;
}

.section-user-hint {
  margin: 2px 0 8px;
  font-size: 0.78rem;
  color: #475569;
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
  border-top: 1px solid #E2E8F0;
  text-align: center;
}

.footer-plate {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  color: #64748B;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-brand {
  font-weight: 800;
  color: #0369A1;
  letter-spacing: 0.06em;
}

.footer-dot {
  color: #38BDF8;
}

.footer-note {
  color: #64748B;
}

@media (max-width: 440px) {
  .daily-content-stage {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
