<script setup lang="ts">
import { CheckCircle2, RotateCcw, RotateCw } from 'lucide-vue-next';

defineProps<{
  isUpdating: boolean;
  notificationMessage: string | null;
}>();

const emit = defineEmits<{
  (e: 'update'): void;
  (e: 'rewind'): void;
}>();
</script>

<template>
  <div class="update-action-container">
    <!-- Toast Notification Banner with Undo Option -->
    <transition name="toast">
      <div v-if="notificationMessage" class="update-toast-banner" role="status">
        <div class="toast-left">
          <CheckCircle2 :size="16" class="toast-icon" />
          <span>{{ notificationMessage }}</span>
        </div>
        <button
          type="button"
          class="toast-undo-btn"
          @click="emit('rewind')"
        >
          <RotateCcw :size="13" />
          <span>Повернути</span>
        </button>
      </div>
    </transition>

    <!-- Master Action Controls Row -->
    <div class="actions-button-row">
      <!-- Rewind to Previous Day Button -->
      <button
        type="button"
        class="secondary-rewind-btn"
        :disabled="isUpdating"
        title="Повернутися до попереднього тренування в циклі"
        @click="emit('rewind')"
      >
        <RotateCcw :size="16" />
        <span class="btn-text">Попередній день</span>
      </button>

      <!-- Primary Update Button (Opens Confirmation) -->
      <button
        type="button"
        class="primary-update-btn"
        :class="{ 'btn-spinning': isUpdating }"
        :disabled="isUpdating"
        @click="emit('update')"
      >
        <RotateCw :size="18" class="btn-icon" :class="{ spin: isUpdating }" />
        <span class="btn-text">ОНОВИТИ ПРОГРАМУ</span>
      </button>
    </div>

    <p class="button-hint">
      Перехід до наступного тренування в 12-денному циклі (або автоматично наступного дня)
    </p>
  </div>
</template>

<style scoped>
.update-action-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  margin-top: 28px;
  margin-bottom: 24px;
}

.update-toast-banner {
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

.toast-undo-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  color: #0284C7;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toast-undo-btn:hover {
  background: #0284C7;
  color: #FFFFFF;
}

.actions-button-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.secondary-rewind-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1.5px solid #BAE6FD;
  border-radius: 16px;
  padding: 16px 12px;
  color: #0369A1;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.05);
}

.secondary-rewind-btn:hover:not(:disabled) {
  background: #F0F7FD;
  color: #0284C7;
  border-color: #0284C7;
  transform: translateY(-1px);
}

.secondary-rewind-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.primary-update-btn {
  flex: 1.5;
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

.primary-update-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0369A1 0%, #075985 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(2, 132, 199, 0.38);
}

.primary-update-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.primary-update-btn:disabled,
.secondary-rewind-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.btn-icon.spin {
  animation: spin-clockwise 0.7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.button-hint {
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

@keyframes spin-clockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 420px) {
  .actions-button-row {
    flex-direction: column;
  }
  .primary-update-btn,
  .secondary-rewind-btn {
    width: 100%;
  }
}
</style>
