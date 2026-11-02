<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Calendar, Dumbbell, RotateCcw, RotateCw, Wifi, WifiOff } from 'lucide-vue-next';

defineProps<{
  todayDateInfo: {
    formattedFullDate: string;
    weekdayName: string;
    dayAndMonth: string;
  };
  isUpdating?: boolean;
}>();

defineEmits<{
  (e: 'request-update'): void;
  (e: 'request-rewind'): void;
}>();

const isOnline = ref<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

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

      <!-- Header Action Controls -->
      <div class="header-actions">
        <!-- Rewind / Previous Day Button -->
        <button
          type="button"
          class="header-icon-btn rewind-btn"
          title="Повернутися до попереднього тренування"
          aria-label="Попереднє тренування"
          @click="$emit('request-rewind')"
        >
          <RotateCcw :size="13" />
          <span class="btn-caption">Вчора</span>
        </button>

        <!-- Master Update Icon Button in Header -->
        <button
          type="button"
          class="header-icon-btn update-btn"
          :class="{ spinning: isUpdating }"
          title="Оновити програму тренування"
          aria-label="Оновити програму тренування"
          @click="$emit('request-update')"
        >
          <RotateCw :size="13" class="update-icon" :class="{ spin: isUpdating }" />
          <span class="btn-caption">Оновити</span>
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
      <span class="mode-badge">ЩОДЕННА ПРОГРАМА</span>
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

.header-icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  line-height: 1;
}

.header-icon-btn:hover {
  transform: translateY(-1px);
}

.header-icon-btn:active {
  transform: translateY(1px);
}

.rewind-btn {
  background: #F0F7FD;
  border-color: #BAE6FD;
  color: #0369A1;
}

.rewind-btn:hover {
  background: #E0F2FE;
  color: #0284C7;
}

.update-btn {
  background: #E0F2FE;
  border-color: #7DD3FC;
  color: #0284C7;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.12);
}

.update-btn:hover {
  background: #0284C7;
  border-color: #0284C7;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
}

.update-icon.spin {
  animation: spin-clockwise 0.7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes spin-clockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
