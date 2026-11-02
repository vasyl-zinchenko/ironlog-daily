import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.css';

import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker with auto-update
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.info('[PWA] New content available.');
  },
  onOfflineReady() {
    console.info('[PWA] Application ready to work offline.');
  },
});

const app = createApp(App);
app.mount('#app');
