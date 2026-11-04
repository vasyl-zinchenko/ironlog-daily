<script setup lang="ts">
import type { Exercise } from '../../types/exercise';

const props = defineProps<{
  illustrationId: Exercise['illustrationId'];
  name: string;
}>();

function photoUrl(position: 'start' | 'finish') {
  return `./exercise-photos/${props.illustrationId}-${position}.jpg`;
}
</script>

<template>
  <figure class="exercise-photo-card">
    <figcaption class="photo-heading">
      <strong>Як виконувати: {{ name }}</strong>
      <span>Реальні фото початкового та кінцевого положень</span>
    </figcaption>

    <div class="photo-pair">
      <div class="photo-step">
        <img :src="photoUrl('start')" :alt="`${name}: початкове положення`" loading="lazy" />
        <span class="step-label">ПОЧАТОК РУХУ</span>
      </div>
      <div class="photo-step">
        <img :src="photoUrl('finish')" :alt="`${name}: кінцеве положення`" loading="lazy" />
        <span class="step-label">КІНЕЦЬ РУХУ</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.exercise-photo-card {
  margin: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.05);
}

.photo-heading {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #0F172A;
  font-size: 0.82rem;
}

.photo-heading span {
  color: #64748B;
  font-size: 0.72rem;
}

.photo-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.photo-step {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: #F8FBFE;
}

.photo-step img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background: #E2E8F0;
}

.step-label {
  display: block;
  padding: 7px 5px;
  color: #0369A1;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-align: center;
}
</style>
