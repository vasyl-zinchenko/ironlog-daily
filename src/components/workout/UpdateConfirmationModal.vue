<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { ArrowRight, CheckCircle2, RotateCw, X } from 'lucide-vue-next';
import type { WorkoutProgram } from '../../types/workout';

const props = defineProps<{
  isOpen: boolean;
  currentProgram: WorkoutProgram;
  nextProgram: WorkoutProgram;
  currentNumberFormatted: string;
  nextNumberFormatted: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('cancel');
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-confirm-title"
        @click.self="emit('cancel')"
      >
        <div class="modal-card">
          <!-- Close Icon Button -->
          <button
            type="button"
            class="modal-close-btn"
            aria-label="Закрити діалог"
            @click="emit('cancel')"
          >
            <X :size="18" />
          </button>

          <!-- Top Badge & Icon -->
          <div class="modal-badge-wrapper">
            <div class="icon-circle">
              <RotateCw :size="24" class="rotate-icon" />
            </div>
            <span class="modal-eyebrow">ПІДТВЕРДЖЕННЯ ОНОВЛЕННЯ</span>
          </div>

          <!-- Title -->
          <h3 id="modal-confirm-title" class="modal-title">
            Оновити програму тренування?
          </h3>

          <p class="modal-subtitle">
            Ви перейдете до наступного дня в 12-денному циклі тренувань.
          </p>

          <!-- Sequence Preview Strip -->
          <div class="transition-preview-box">
            <!-- Current Program Box -->
            <div class="preview-item current">
              <span class="preview-tag">ЗАРАЗ</span>
              <strong class="preview-num">{{ currentNumberFormatted }}</strong>
              <span class="preview-name">{{ currentProgram.title }}</span>
            </div>

            <div class="preview-arrow">
              <ArrowRight :size="18" />
            </div>

            <!-- Next Program Box -->
            <div class="preview-item next">
              <span class="preview-tag next-tag">БУДЕ</span>
              <strong class="preview-num next-num">{{ nextNumberFormatted }}</strong>
              <span class="preview-name">{{ nextProgram.title }}</span>
            </div>
          </div>

          <!-- Safe Reassurance Callout -->
          <div class="reassurance-note">
            <CheckCircle2 :size="16" class="check-icon" />
            <span>
              Випадково оновили? Ви завжди зможете повернутися назад кнопкою <strong>«Попередній день»</strong>.
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="modal-actions">
            <button
              type="button"
              class="btn-confirm"
              @click="emit('confirm')"
            >
              <RotateCw :size="16" />
              <span>Так, перейти до наступного</span>
            </button>

            <button
              type="button"
              class="btn-cancel"
              @click="emit('cancel')"
            >
              Скасувати
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 24px;
  padding: 28px 24px 24px;
  box-shadow: 0 24px 60px rgba(2, 132, 199, 0.2);
  text-align: center;
  animation: modal-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #BAE6FD;
  background: #FFFFFF;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #E0F2FE;
  color: #0284C7;
  transform: scale(1.05);
}

.modal-badge-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #E0F2FE;
  border: 2px solid #7DD3FC;
  color: #0284C7;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.15);
}

.modal-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: #0284C7;
  text-transform: uppercase;
}

.modal-title {
  margin: 0 0 8px;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.25;
}

.modal-subtitle {
  margin: 0 0 20px;
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.45;
}

.transition-preview-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #F8FBFE;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 16px;
}

.preview-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.preview-tag {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748B;
  margin-bottom: 2px;
}

.preview-tag.next-tag {
  color: #0284C7;
}

.preview-num {
  font-size: 1.25rem;
  font-weight: 900;
  color: #334155;
  line-height: 1.1;
}

.preview-num.next-num {
  color: #0284C7;
}

.preview-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: #0F172A;
  line-height: 1.2;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.preview-arrow {
  color: #38BDF8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.reassurance-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 0.8rem;
  color: #0369A1;
  text-align: left;
  line-height: 1.35;
  margin-bottom: 22px;
}

.check-icon {
  flex-shrink: 0;
  color: #0284C7;
  margin-top: 1px;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-confirm {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 14px;
  padding: 14px 20px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.28);
  transition: all 0.2s ease;
}

.btn-confirm:hover {
  background: linear-gradient(135deg, #0369A1 0%, #075985 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(2, 132, 199, 0.35);
}

.btn-confirm:active {
  transform: translateY(1px);
}

.btn-cancel {
  width: 100%;
  background: transparent;
  color: #64748B;
  border: 1px solid #BAE6FD;
  border-radius: 14px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #F0F7FD;
  color: #0F172A;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.93) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
