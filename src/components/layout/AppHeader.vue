<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Calendar, Dumbbell, Moon, Sun, Wifi, WifiOff } from 'lucide-vue-next';
import { useTheme } from '../../composables/useTheme';

defineProps<{
  todayDateInfo: {
    formattedFullDate: string;
    weekdayName: string;
    dayAndMonth: string;
  };
}>();

const isOnline = ref<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
const { isDark, toggleTheme } = useTheme();

function updateOnlineStatus() {
  isOnline.value = navigator.onLine;
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus);
  window.removeEventListener('offline', updateOnlineStatus);
});
</script>

<template>
  <header class="app-top-header">
    <div class="brand-row">
      <!-- Brand Logo -->
      <div class="brand-badge">
        <div class="brand-icon-pod">
          <Dumbbell :size="16" class="brand-dumbbell" />
        </div>
        <span class="brand-name">IRONLOG</span>
        <span class="brand-slash">//</span>
        <span class="brand-tag">DAILY</span>
      </div>

      <div class="header-actions">
        <button
          type="button"
          class="theme-toggle"
          :aria-label="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
          :title="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <!-- Online / Offline PWA Telemetry Pill -->
        <div
          class="network-status-pill"
          :class="{ offline: !isOnline }"
          :title="isOnline ? 'Підключено до мережі' : 'Автономний режим (100% офлайн)'"
        >
          <span class="status-dot"></span>
          <component :is="isOnline ? Wifi : WifiOff" :size="11" />
          <span>{{ isOnline ? 'В МЕРЕЖІ' : 'ОФЛАЙН' }}</span>
        </div>
      </div>
    </div>

    <!-- Date Strip: Day of Week & Date -->
    <div class="date-strip">
      <div class="date-left">
        <Calendar :size="14" class="date-icon" />
        <span class="weekday">{{ todayDateInfo.weekdayName }},</span>
        <strong class="day-month">{{ todayDateInfo.dayAndMonth }}</strong>
      </div>
      <span class="mode-badge">ТРЕНУВАННЯ</span>
    </div>
  </header>
</template>

<style scoped>
.app-top-header {
  padding: 14px 18px 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid #BAE6FD;
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(2, 132, 199, 0.05);
}

.brand-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #0F172A;
}

.brand-icon-pod {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-dumbbell {
  color: #0284C7;
}

.brand-name {
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #0F172A;
}

.brand-slash {
  color: #38BDF8;
  font-size: 0.85rem;
}

.brand-tag {
  color: #0284C7;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.theme-toggle {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid #BAE6FD;
  border-radius: 50%;
  background: #E0F2FE;
  color: #0369A1;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease, color 0.18s ease;
}

.theme-toggle:hover {
  background: #BAE6FD;
  color: #0C4A6E;
  transform: rotate(-8deg);
}

.theme-toggle:focus-visible {
  outline: 2px solid #0284C7;
  outline-offset: 3px;
}

.network-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  color: #0369A1;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.network-status-pill.offline {
  background: #FEF2F2;
  border-color: #FECACA;
  color: #DC2626;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #0284C7;
}

.network-status-pill.offline .status-dot {
  background: #DC2626;
}

.date-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #64748B;
}

.date-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-icon {
  color: #0284C7;
}

.weekday {
  color: #64748B;
}

.day-month {
  color: #0F172A;
  font-weight: 700;
}

.mode-badge {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #0369A1;
  background: #E0F2FE;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #BAE6FD;
}
</style>
