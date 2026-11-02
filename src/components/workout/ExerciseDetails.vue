<script setup lang="ts">
import { AlertTriangle, CheckCircle2, Eye, Info } from 'lucide-vue-next';
import type { ExerciseTechnique } from '../../types/exercise';

defineProps<{
  technique: ExerciseTechnique;
}>();
</script>

<template>
  <div class="exercise-details-panel">
    <!-- Short instruction box -->
    <div class="instruction-box">
      <Info :size="16" class="box-icon" />
      <p class="instruction-text">{{ technique.shortInstruction }}</p>
    </div>

    <!-- Correct Technique Steps -->
    <div class="details-section">
      <h5 class="section-title">
        <CheckCircle2 :size="14" class="title-icon blue-icon" />
        КЛЮЧОВІ ПРАВИЛА ТЕХНІКИ
      </h5>
      <ul class="cues-list">
        <li v-for="(cue, idx) in technique.cues" :key="idx" class="cue-item">
          <span class="cue-bullet">{{ idx + 1 }}</span>
          <span>{{ cue }}</span>
        </li>
      </ul>
    </div>

    <!-- Focus Point -->
    <div class="focus-callout">
      <Eye :size="15" class="focus-icon" />
      <div>
        <strong class="focus-label">ФОКУС УВАГИ ТА НЕЙРОМ’ЯЗОВИЙ ЗВ’ЯЗОК:</strong>
        <p class="focus-text">{{ technique.focus }}</p>
      </div>
    </div>

    <!-- Common Mistakes -->
    <div class="details-section mistakes-section">
      <h5 class="section-title">
        <AlertTriangle :size="14" class="title-icon sky-icon" />
        ТИПОВІ ПОМИЛКИ, ЯКИХ СЛІД УНИКАТИ
      </h5>
      <ul class="mistakes-list">
        <li v-for="(err, idx) in technique.commonMistakes" :key="idx" class="mistake-item">
          <span class="mistake-cross">✕</span>
          <span>{{ err }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.exercise-details-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.instruction-box {
  background: #F0F7FD;
  border-left: 3px solid #0284C7;
  border-radius: 0 12px 12px 0;
  padding: 10px 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.box-icon {
  color: #0284C7;
  flex-shrink: 0;
  margin-top: 2px;
}

.instruction-text {
  margin: 0;
  font-size: 0.84rem;
  color: #0F172A;
  line-height: 1.45;
  font-weight: 500;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-title {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748B;
  display: flex;
  align-items: center;
  gap: 6px;
}

.blue-icon {
  color: #0284C7;
}

.sky-icon {
  color: #0EA5E9;
}

.cues-list, .mistakes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cue-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.82rem;
  color: #334155;
  line-height: 1.4;
}

.cue-bullet {
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  color: #0284C7;
  font-size: 0.7rem;
  font-weight: 800;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.focus-callout {
  background: #F0F7FD;
  border: 1px solid #BAE6FD;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.focus-icon {
  color: #0284C7;
  flex-shrink: 0;
  margin-top: 2px;
}

.focus-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #0284C7;
  text-transform: uppercase;
}

.focus-text {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: #1E293B;
  line-height: 1.4;
}

.mistake-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.4;
}

.mistake-cross {
  color: #0EA5E9;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 1px;
}
</style>
