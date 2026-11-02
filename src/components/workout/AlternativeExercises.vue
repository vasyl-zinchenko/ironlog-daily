<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronUp, Dumbbell, ShieldCheck } from 'lucide-vue-next';
import type { ExerciseAlternative } from '../../types/exercise';

defineProps<{
  alternatives: ExerciseAlternative[];
}>();

const isExpanded = ref(false);
</script>

<template>
  <div class="alternatives-block">
    <button
      class="alt-toggle-bar"
      :class="{ open: isExpanded }"
      @click="isExpanded = !isExpanded"
    >
      <div class="alt-label-wrap">
        <Dumbbell :size="15" class="alt-icon" />
        <span class="alt-title">АЛЬТЕРНАТИВИ ДО ВПРАВИ</span>
        <span class="alt-count">{{ alternatives.length }}</span>
      </div>
      <component :is="isExpanded ? ChevronUp : ChevronDown" :size="16" class="chevron" />
    </button>

    <div v-if="isExpanded" class="alt-cards-feed">
      <p class="alt-intro-note">
        Якщо снаряд або тренажер зайнятий, оберіть будь-яку з перевірених біомеханічних замін:
      </p>

      <div
        v-for="(alt, idx) in alternatives"
        :key="idx"
        class="alt-item-card"
      >
        <div class="alt-card-header">
          <strong class="alt-name">{{ alt.name }}</strong>
          <span class="alt-equip-badge">
            <Dumbbell :size="12" /> {{ alt.equipment }}
          </span>
        </div>
        <p class="alt-reason">
          <ShieldCheck :size="13" class="shield-icon" />
          <span>{{ alt.reason }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alternatives-block {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 14px;
  overflow: hidden;
}

.alt-toggle-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #334155;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.alt-toggle-bar:hover, .alt-toggle-bar.open {
  color: #0284C7;
  background: #F0F7FD;
}

.alt-label-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.alt-icon {
  color: #0284C7;
}

.alt-count {
  background: #E0F2FE;
  color: #0284C7;
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
}

.chevron {
  color: #64748B;
}

.open .chevron {
  color: #0284C7;
}

.alt-cards-feed {
  padding: 0 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #E0F2FE;
  background: #F8FBFE;
}

.alt-intro-note {
  margin: 10px 0 2px;
  font-size: 0.78rem;
  color: #64748B;
}

.alt-item-card {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 12px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.04);
}

.alt-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.alt-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0F172A;
}

.alt-equip-badge {
  font-size: 0.7rem;
  color: #0369A1;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  padding: 2px 8px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  font-weight: 600;
}

.alt-reason {
  margin: 0;
  font-size: 0.8rem;
  color: #334155;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.4;
}

.shield-icon {
  color: #0284C7;
  flex-shrink: 0;
  margin-top: 2px;
}
</style>
