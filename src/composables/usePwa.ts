import { onMounted, ref } from 'vue';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePwa() {
  const installPrompt = ref<BeforeInstallPromptEvent | null>(null);
  const updateAvailable = ref(false);
  const isOnline = ref(navigator.onLine);

  onMounted(() => {
    const onlineListener = () => {
      isOnline.value = navigator.onLine;
    };

    const beforeInstallPromptListener = (event: Event) => {
      event.preventDefault();
      installPrompt.value = event as BeforeInstallPromptEvent;
    };

    window.addEventListener('online', onlineListener);
    window.addEventListener('offline', onlineListener);
    window.addEventListener('beforeinstallprompt', beforeInstallPromptListener);

    return () => {
      window.removeEventListener('online', onlineListener);
      window.removeEventListener('offline', onlineListener);
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptListener);
    };
  });

  const install = async () => {
    if (!installPrompt.value) {
      return false;
    }

    installPrompt.value.prompt();
    await installPrompt.value.userChoice;
    installPrompt.value = null;
    return true;
  };

  return {
    installPrompt,
    updateAvailable,
    isOnline,
    install,
  };
}
