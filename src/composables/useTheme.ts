import { ref } from 'vue';

const STORAGE_KEY = 'ironlog_theme';
const isDark = ref(true);
let initialized = false;

function applyTheme() {
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
    'content',
    isDark.value ? '#10171E' : '#FFFFFF',
  );
}

function initializeTheme() {
  if (initialized) return;
  initialized = true;

  try {
    isDark.value = localStorage.getItem(STORAGE_KEY) !== 'light';
  } catch (error) {
    console.warn('Не вдалося завантажити налаштування теми.', error);
  }

  applyTheme();
}

initializeTheme();

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value;
    applyTheme();

    try {
      localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
    } catch (error) {
      console.warn('Не вдалося зберегти налаштування теми.', error);
    }
  }

  return { isDark, toggleTheme };
}
