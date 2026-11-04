<script setup lang="ts">
import { CheckCircle2, CircleCheck } from 'lucide-vue-next';

defineProps<{
  isUpdating: boolean;
  notificationMessage: string | null;
  completedCount: number;
  totalCount: number;
}>();

const emit = defineEmits<{
  (e: 'finish'): void;
}>();
</script>

<template>
  <div class="finish-day-container">
    <transition name="toast">
      <div v-if="notificationMessage" class="finish-day-toast" role="status">
        <div class="toast-left">
          <CheckCircle2 :size="16" class="toast-icon" />
          <span>{{ notificationMessage }}</span>
        </div>
      </div>
    </transition>

    <div class="finish-day-actions">
      <button
        type="button"
        class="finish-day-button"
        :disabled="isUpdating"
        @click="emit('finish')"
      >
        <CircleCheck :size="18" />
        <span>ЗАВЕРШИТИ ДЕНЬ</span>
      </button>
    </div>

    <p class="finish-day-hint">Виконано {{ completedCount }} із {{ totalCount }} вправ. Програма зміниться після завершення дня.</p>
  </div>
</template>

<style scoped>
.finish-day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  margin-top: 28px;
  margin-bottom: 24px;
}

.finish-day-toast {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: #FFFFFF;
  border: 1.5px solid #0284C7;
  color: #0F172A;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.16);
  max-width: 92%;
}

.toast-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toast-icon {
  color: #0284C7;
  flex-shrink: 0;
}

.finish-day-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.finish-day-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.3);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.finish-day-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #0369A1 0%, #075985 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(2, 132, 199, 0.38);
}

.finish-day-button:active:not(:disabled) {
  transform: translateY(1px);
}

.finish-day-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.finish-day-hint {
  margin: 0;
  font-size: 0.78rem;
  color: #64748B;
  text-align: center;
  line-height: 1.35;
  max-width: 90%;
}

/* Toast Transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

</style>
