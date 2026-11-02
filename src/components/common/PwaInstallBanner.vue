<script setup lang="ts">
import { ref } from 'vue';
import { Download, Smartphone, X } from 'lucide-vue-next';
import { usePwa } from '../../composables/usePwa';

const { installPrompt, install } = usePwa();
const isDismissed = ref(false);

async function handleInstall() {
  await install();
}
</script>

<template>
  <div v-if="installPrompt && !isDismissed" class="pwa-banner">
    <div class="banner-left">
      <div class="icon-pod">
        <Smartphone :size="18" class="banner-icon" />
      </div>
      <div>
        <strong class="banner-title">Встановити IronLog Daily</strong>
        <p class="banner-sub">Швидкий запуск офлайн як нативний додаток</p>
      </div>
    </div>

    <div class="banner-actions">
      <button class="install-btn" @click="handleInstall">
        <Download :size="14" /> Додати
      </button>
      <button class="dismiss-btn" aria-label="Закрити" @click="isDismissed = true">
        <X :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.pwa-banner {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 18px rgba(2, 132, 199, 0.08);
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-pod {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #E0F2FE;
  border: 1px solid #BAE6FD;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.banner-icon {
  color: #0284C7;
}

.banner-title {
  display: block;
  font-size: 0.88rem;
  font-weight: 800;
  color: #0F172A;
}

.banner-sub {
  margin: 2px 0 0;
  font-size: 0.74rem;
  color: #475569;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.install-btn {
  background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  padding: 7px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
}

.install-btn:hover {
  background: #0369A1;
  transform: translateY(-1px);
}

.dismiss-btn {
  background: transparent;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.dismiss-btn:hover {
  background: #E0F2FE;
  color: #0284C7;
}
</style>
