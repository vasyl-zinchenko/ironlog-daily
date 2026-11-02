<script setup lang="ts">
import { Clock, Flame, Layers } from 'lucide-vue-next';
import type { WorkoutProgram } from '../../types/workout';

defineProps<{
  program: WorkoutProgram;
  programNumberFormatted: string;
  totalCount: number;
}>();
</script>

<template>
  <section class="workout-hero-editorial">
    <!-- Top Editorial Header Strip -->
    <div class="hero-top-strip">
      <div class="editorial-meta">
        <span class="plate-spec">ПРОГРАМА ТРЕНУВАННЯ</span>
        <span class="plate-dot">•</span>
        <span class="plate-cycle">СИЛОВИЙ МАКРОЦИКЛ</span>
      </div>

      <!-- Prominent Program Number Badge (e.g. 04 / 12) -->
      <div class="program-sequence-badge">
        <span class="current-num">{{ programNumberFormatted }}</span>
        <span class="divider">/</span>
        <span class="total-num">{{ String(totalCount).padStart(2, '0') }}</span>
      </div>
    </div>

    <!-- Massive Workout Title -->
    <div class="hero-body">
      <p class="hero-pre-title">{{ program.subtitle }}</p>
      <h2 class="hero-title">{{ program.title }}</h2>

      <!-- Main Focus Banner -->
      <div class="emphasis-strip">
        <Flame :size="16" class="emphasis-icon" />
        <span class="emphasis-text">{{ program.emphasis }}</span>
      </div>
    </div>

    <!-- Telemetry Badges Strip -->
    <div class="hero-telemetry-bar">
      <div class="telemetry-pill">
        <Clock :size="14" class="telemetry-icon blue" />
        <span class="telemetry-label">Тривалість:</span>
        <strong class="telemetry-val">~{{ program.approxMinutes }} хв</strong>
      </div>

      <div class="telemetry-pill">
        <Layers :size="14" class="telemetry-icon cyan" />
        <span class="telemetry-label">Вправ:</span>
        <strong class="telemetry-val">{{ program.exercises.length }}</strong>
      </div>
    </div>

    <!-- Target Muscle Groups Banner -->
    <div class="muscle-groups-footer">
      <span class="muscle-label">ЗОНИ НАВАНТАЖЕННЯ:</span>
      <span class="muscle-tags">{{ program.muscleGroupsText }}</span>
    </div>

    <!-- Cycle Variation Notice (if present) -->
    <p v-if="program.cycleVariationNotice" class="variation-tip">
      <span class="tip-badge">ПОРАДА ЦИКЛУ:</span> {{ program.cycleVariationNotice }}
    </p>
  </section>
</template>

<style scoped>
.workout-hero-editorial {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04);
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.workout-hero-editorial::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #0284C7 0%, #38BDF8 100%);
}

.hero-top-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #E0F2FE;
  padding-bottom: 12px;
}

.editorial-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #64748B;
}

.plate-spec {
  color: #0284C7;
}

.plate-dot {
  color: #7DD3FC;
}

.plate-cycle {
  color: #64748B;
}

.program-sequence-badge {
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  border-radius: 10px;
  padding: 4px 10px;
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}

.current-num {
  font-size: 1.25rem;
  font-weight: 900;
  color: #0284C7;
  line-height: 1;
}

.divider {
  font-size: 0.9rem;
  color: #7DD3FC;
}

.total-num {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0369A1;
}

.hero-body {
  padding: 16px 0 14px;
}

.hero-pre-title {
  margin: 0 0 4px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0284C7;
}

.hero-title {
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 5.2vw, 2.1rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #0F172A;
}

.emphasis-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F0F7FD;
  border: 1px solid #BAE6FD;
  border-radius: 12px;
  padding: 9px 12px;
}

.emphasis-icon {
  color: #0284C7;
  flex-shrink: 0;
}

.emphasis-text {
  font-size: 0.84rem;
  font-weight: 600;
  color: #1E293B;
}

.hero-telemetry-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.telemetry-pill {
  flex: 1;
  background: #F8FBFE;
  border: 1px solid #E0F2FE;
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.telemetry-icon.blue {
  color: #0284C7;
}

.telemetry-icon.cyan {
  color: #0EA5E9;
}

.telemetry-label {
  font-size: 0.75rem;
  color: #64748B;
}

.telemetry-val {
  margin-left: auto;
  font-size: 0.9rem;
  color: #0F172A;
  font-weight: 700;
}

.muscle-groups-footer {
  border-top: 1px solid #E0F2FE;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.muscle-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #64748B;
  text-transform: uppercase;
}

.muscle-tags {
  font-size: 0.84rem;
  font-weight: 700;
  color: #0369A1;
}

.variation-tip {
  margin: 10px 0 0;
  padding-top: 8px;
  border-top: 1px dashed #BAE6FD;
  font-size: 0.78rem;
  color: #475569;
  line-height: 1.4;
}

.tip-badge {
  font-weight: 800;
  color: #0284C7;
}
</style>
