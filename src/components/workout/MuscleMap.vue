<script setup lang="ts">
import { computed } from 'vue';
import type { MuscleId } from '../../types/exercise';
import { MUSCLE_GROUPS } from '../../data/muscleGroups';

const props = defineProps<{
  primaryMuscle: MuscleId;
  secondaryMuscles?: MuscleId[];
}>();

const primaryInfo = computed(() => MUSCLE_GROUPS[props.primaryMuscle]);
const secondaryList = computed(() => (props.secondaryMuscles || []).map((m) => MUSCLE_GROUPS[m]));

function isPrimary(id: MuscleId): boolean {
  return props.primaryMuscle === id;
}

function isSecondary(id: MuscleId): boolean {
  return Boolean(props.secondaryMuscles?.includes(id));
}

function getFillColor(id: MuscleId): string {
  if (isPrimary(id)) return '#0284C7'; // Vibrant Cobalt Blue
  if (isSecondary(id)) return '#38BDF8'; // Soft Sky Cyan
  return '#E0F2FE'; // Pale Ice Blue
}

function getStrokeColor(id: MuscleId): string {
  if (isPrimary(id)) return '#0369A1';
  if (isSecondary(id)) return '#0284C7';
  return '#BAE6FD';
}
</script>

<template>
  <div class="muscle-map-widget">
    <div class="map-header">
      <span class="map-badge">АНАТОМІЯ НАВАНТАЖЕННЯ</span>
      <div class="map-legend">
        <span class="legend-item">
          <span class="dot dot-primary"></span> Основний фокус
        </span>
        <span v-if="secondaryMuscles && secondaryMuscles.length > 0" class="legend-item">
          <span class="dot dot-secondary"></span> Синергісти
        </span>
      </div>
    </div>

    <!-- Dual Silhouette: Front & Back Human Body Diagram -->
    <div class="silhouettes-container">
      <!-- FRONT VIEW -->
      <div class="figure-wrapper">
        <span class="view-tag">ВИД СПЕРЕДУ</span>
        <svg
          viewBox="0 0 160 300"
          class="body-svg"
          aria-label="Анатомічна карта спереду"
        >
          <!-- Body Outline Base / Head / Neck -->
          <circle cx="80" cy="24" r="14" fill="var(--muscle-neutral-fill)" stroke="var(--muscle-neutral-stroke)" stroke-width="1.5" />
          <path d="M74,38 L74,48 L86,48 L86,38 Z" fill="var(--muscle-neutral-fill)" stroke="var(--muscle-neutral-stroke)" stroke-width="1.5" />

          <!-- Shoulders (Front Delts) -->
          <path
            d="M50,54 Q42,56 40,68 Q48,74 54,66 Z"
            :fill="getFillColor('shoulders')"
            :stroke="getStrokeColor('shoulders')"
            stroke-width="1.5"
            class="muscle-path"
          />
          <path
            d="M110,54 Q118,56 120,68 Q112,74 106,66 Z"
            :fill="getFillColor('shoulders')"
            :stroke="getStrokeColor('shoulders')"
            stroke-width="1.5"
            class="muscle-path"
          />

          <!-- Biceps -->
          <path
            d="M38,72 Q34,92 38,106 Q46,104 48,84 Q48,70 38,72 Z"
            :fill="getFillColor('biceps')"
            :stroke="getStrokeColor('biceps')"
            stroke-width="1.5"
            class="muscle-path"
          />
          <path
            d="M122,72 Q126,92 122,106 Q114,104 112,84 Q112,70 122,72 Z"
            :fill="getFillColor('biceps')"
            :stroke="getStrokeColor('biceps')"
            stroke-width="1.5"
            class="muscle-path"
          />

          <!-- Forearms Front -->
          <path d="M35,110 L28,146 L38,146 L45,112 Z" fill="#1C212B" stroke="#363E4D" stroke-width="1.5" />
          <path d="M125,110 L132,146 L122,146 L115,112 Z" fill="#1C212B" stroke="#363E4D" stroke-width="1.5" />

          <!-- Chest (Pectorals) -->
          <path
            d="M56,52 Q78,54 78,74 Q78,84 56,84 Q50,70 56,52 Z"
            :fill="getFillColor('chest')"
            :stroke="getStrokeColor('chest')"
            stroke-width="1.8"
            class="muscle-path"
          />
          <path
            d="M104,52 Q82,54 82,74 Q82,84 104,84 Q110,70 104,52 Z"
            :fill="getFillColor('chest')"
            :stroke="getStrokeColor('chest')"
            stroke-width="1.8"
            class="muscle-path"
          />

          <!-- Abs / Core (Прес) -->
          <path
            d="M62,88 Q80,88 98,88 Q96,128 92,136 Q80,140 68,136 Q64,128 62,88 Z"
            :fill="getFillColor('abs')"
            :stroke="getStrokeColor('abs')"
            stroke-width="1.5"
            class="muscle-path"
          />

          <!-- Quads (Квадрицепси) -->
          <path
            d="M56,142 Q76,142 76,182 Q72,216 58,220 Q48,206 50,170 Q52,146 56,142 Z"
            :fill="getFillColor('quads')"
            :stroke="getStrokeColor('quads')"
            stroke-width="1.8"
            class="muscle-path"
          />
          <path
            d="M104,142 Q84,142 84,182 Q88,216 102,220 Q112,206 110,170 Q108,146 104,142 Z"
            :fill="getFillColor('quads')"
            :stroke="getStrokeColor('quads')"
            stroke-width="1.8"
            class="muscle-path"
          />

          <!-- Calves Front / Shins -->
          <path
            d="M54,232 Q68,232 64,272 L50,272 Q48,252 54,232 Z"
            :fill="getFillColor('calves')"
            :stroke="getStrokeColor('calves')"
            stroke-width="1.5"
            class="muscle-path"
          />
          <path
            d="M106,232 Q92,232 96,272 L110,272 Q112,252 106,232 Z"
            :fill="getFillColor('calves')"
            :stroke="getStrokeColor('calves')"
            stroke-width="1.5"
            class="muscle-path"
          />
        </svg>
      </div>

      <!-- BACK VIEW -->
      <div class="figure-wrapper">
        <span class="view-tag">ВИД ЗЗАДУ</span>
        <svg
          viewBox="0 0 160 300"
          class="body-svg"
          aria-label="Анатомічна карта ззаду"
        >
          <!-- Head / Neck back -->
          <circle cx="80" cy="24" r="14" fill="var(--muscle-neutral-fill)" stroke="var(--muscle-neutral-stroke)" stroke-width="1.5" />
          <path d="M74,38 L74,48 L86,48 L86,38 Z" fill="var(--muscle-neutral-fill)" stroke="var(--muscle-neutral-stroke)" stroke-width="1.5" />

          <!-- Upper Back & Traps (Трапеція) -->
          <path
            d="M72,44 L88,44 L108,58 L80,90 L52,58 Z"
            :fill="getFillColor('upper_back')"
            :stroke="getStrokeColor('upper_back')"
            stroke-width="1.5"
            class="muscle-path"
          />

          <!-- Rear Delts -->
          <path
            d="M48,56 Q38,62 38,72 Q46,76 52,68 Z"
            :fill="getFillColor('shoulders')"
            :stroke="getStrokeColor('shoulders')"
            stroke-width="1.5"
            class="muscle-path"
          />
          <path
            d="M112,56 Q122,62 122,72 Q114,76 108,68 Z"
            :fill="getFillColor('shoulders')"
            :stroke="getStrokeColor('shoulders')"
            stroke-width="1.5"
            class="muscle-path"
          />

          <!-- Triceps Back -->
          <path
            d="M36,76 Q30,96 36,108 Q44,106 46,86 Q46,74 36,76 Z"
            :fill="getFillColor('triceps')"
            :stroke="getStrokeColor('triceps')"
            stroke-width="1.5"
            class="muscle-path"
          />
          <path
            d="M124,76 Q130,96 124,108 Q116,106 114,86 Q114,74 124,76 Z"
            :fill="getFillColor('triceps')"
            :stroke="getStrokeColor('triceps')"
            stroke-width="1.5"
            class="muscle-path"
          />

          <!-- Lats (Найширші м’язи спини) -->
          <path
            d="M52,66 Q72,86 64,128 Q78,124 80,124 Q82,124 96,128 Q88,86 108,66 Q80,94 52,66 Z"
            :fill="getFillColor('lats')"
            :stroke="getStrokeColor('lats')"
            stroke-width="1.8"
            class="muscle-path"
          />

          <!-- Glutes (Сідниці) -->
          <path
            d="M52,136 Q78,136 78,168 Q64,178 50,166 Q48,148 52,136 Z"
            :fill="getFillColor('glutes')"
            :stroke="getStrokeColor('glutes')"
            stroke-width="1.8"
            class="muscle-path"
          />
          <path
            d="M108,136 Q82,136 82,168 Q96,178 110,166 Q112,148 108,136 Z"
            :fill="getFillColor('glutes')"
            :stroke="getStrokeColor('glutes')"
            stroke-width="1.8"
            class="muscle-path"
          />

          <!-- Hamstrings (Задня поверхня стегна) -->
          <path
            d="M52,176 Q76,176 74,216 Q62,220 54,216 Q48,198 52,176 Z"
            :fill="getFillColor('hamstrings')"
            :stroke="getStrokeColor('hamstrings')"
            stroke-width="1.8"
            class="muscle-path"
          />
          <path
            d="M108,176 Q84,176 86,216 Q98,220 106,216 Q112,198 108,176 Z"
            :fill="getFillColor('hamstrings')"
            :stroke="getStrokeColor('hamstrings')"
            stroke-width="1.8"
            class="muscle-path"
          />

          <!-- Calves Back (Литки) -->
          <path
            d="M52,230 Q70,230 66,274 L50,274 Q46,252 52,230 Z"
            :fill="getFillColor('calves')"
            :stroke="getStrokeColor('calves')"
            stroke-width="1.8"
            class="muscle-path"
          />
          <path
            d="M108,230 Q90,230 94,274 L110,274 Q114,252 108,230 Z"
            :fill="getFillColor('calves')"
            :stroke="getStrokeColor('calves')"
            stroke-width="1.8"
            class="muscle-path"
          />
        </svg>
      </div>
    </div>

    <!-- Active Muscles Label Chips -->
    <div class="muscles-text-chips">
      <div class="chip chip-primary">
        <span class="chip-dot"></span>
        <strong>{{ primaryInfo.name }}</strong>
      </div>
      <div v-for="sec in secondaryList" :key="sec.id" class="chip chip-secondary">
        <span class="chip-dot"></span>
        <span>{{ sec.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.muscle-map-widget {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.05);
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid #E0F2FE;
  padding-bottom: 8px;
}

.map-badge {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #0284C7;
  text-transform: uppercase;
}

.map-legend {
  display: flex;
  gap: 12px;
  font-size: 0.72rem;
  color: #475569;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.dot-primary {
  background: #0284C7;
  box-shadow: 0 0 6px rgba(2, 132, 199, 0.4);
}

.dot-secondary {
  background: #38BDF8;
}

.silhouettes-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
}

.figure-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  max-width: 140px;
}

.view-tag {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748B;
  text-transform: uppercase;
}

.body-svg {
  width: 100%;
  height: 180px;
  overflow: visible;
  filter: drop-shadow(0 4px 10px rgba(2, 132, 199, 0.1));
}

.muscle-path {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.muscles-text-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.chip-primary {
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  color: #0369A1;
}

.chip-primary .chip-dot {
  background: #0284C7;
  box-shadow: 0 0 5px #0284C7;
}

.chip-secondary {
  background: #F0F7FD;
  border: 1px solid #7DD3FC;
  color: #0284C7;
}

.chip-secondary .chip-dot {
  background: #38BDF8;
}

.chip-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
