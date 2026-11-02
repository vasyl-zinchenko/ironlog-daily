<script setup lang="ts">
defineProps<{
  illustrationId: string;
  name: string;
}>();
</script>

<template>
  <div class="illustration-card">
    <div class="tech-badge-row">
      <span class="tech-spec">ВЕКТОРНА СХЕМА РУХУ</span>
      <span class="tech-indicator">СТАРТ / ФІНІШ РУХУ</span>
    </div>

    <!-- 1. BENCH PRESS -->
    <svg
      v-if="illustrationId === 'bench_press'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема жиму штанги лежачи"
    >
      <!-- Bench Base -->
      <rect x="60" y="105" width="160" height="12" rx="3" fill="#64748B" stroke="#94A3B8" stroke-width="1.5" />
      <line x1="80" y1="117" x2="80" y2="148" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" />
      <line x1="200" y1="117" x2="200" y2="148" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" />
      <line x1="40" y1="148" x2="240" y2="148" stroke="#64748B" stroke-width="2" />

      <!-- Athlete Torso & Head -->
      <circle cx="85" cy="94" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <path d="M96,98 L180,98" stroke="#1E293B" stroke-width="16" stroke-linecap="round" />
      <!-- Chest Highlight -->
      <path d="M110,94 L145,94" stroke="#0284C7" stroke-width="6" stroke-linecap="round" />

      <!-- Legs bent to floor -->
      <path d="M180,98 L198,115 L198,148" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Arms and Barbell: Start & Finish positions -->
      <!-- Position 1: Bar at top (finish) -->
      <line x1="120" y1="36" x2="140" y2="36" stroke="#0284C7" stroke-width="4" />
      <circle cx="118" cy="36" r="8" fill="#1D222A" stroke="#0284C7" stroke-width="2" />
      <circle cx="142" cy="36" r="8" fill="#1D222A" stroke="#0284C7" stroke-width="2" />
      <!-- Arms to top -->
      <path d="M115,92 L120,62 L124,40" fill="none" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />
      <path d="M140,92 L136,62 L134,40" fill="none" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />

      <!-- Position 2: Bar on chest (start) with dashed ghosting -->
      <line x1="112" y1="84" x2="148" y2="84" stroke="#6E7787" stroke-width="3" stroke-dasharray="3 3" />

      <!-- Movement Trajectory Arrows -->
      <path d="M130,48 L130,76" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-down)" />
      <path d="M130,76 L130,48" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-up)" />

      <!-- Legend notes in SVG -->
      <text x="210" y="40" fill="#0284C7" font-size="10" font-family="sans-serif" font-weight="bold">ВЕРХ // ФІКСАЦІЯ</text>
      <text x="210" y="86" fill="#334155" font-size="10" font-family="sans-serif">ТОРКАННЯ ГРУДЕЙ</text>
      <text x="210" y="102" fill="#6E7787" font-size="9" font-family="sans-serif">Лікті під кутом 45–70°</text>
    </svg>

    <!-- 2. INCLINE BENCH PRESS -->
    <svg
      v-else-if="illustrationId === 'incline_press'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема жиму на похилій лаві"
    >
      <!-- Incline Bench 35 deg -->
      <line x1="70" y1="130" x2="160" y2="70" stroke="#64748B" stroke-width="14" stroke-linecap="round" />
      <line x1="90" y1="130" x2="90" y2="150" stroke="#94A3B8" stroke-width="4" />
      <line x1="150" y1="85" x2="150" y2="150" stroke="#94A3B8" stroke-width="4" />

      <!-- Athlete Torso & Head -->
      <circle cx="158" cy="62" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="145" y1="78" x2="90" y2="120" stroke="#1E293B" stroke-width="14" stroke-linecap="round" />
      <line x1="125" y1="90" x2="140" y2="80" stroke="#0284C7" stroke-width="6" stroke-linecap="round" /> <!-- Upper chest -->

      <!-- Dumbbells Trajectory -->
      <rect x="135" y="24" width="22" height="10" rx="3" fill="#0284C7" />
      <path d="M125,90 L135,55 L145,34" fill="none" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />
      <path d="M142,38 L130,72" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2" />

      <text x="180" y="32" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">КУТ ЛАВИ 30°–40°</text>
      <text x="180" y="48" fill="#0F172A" font-size="10" font-family="sans-serif">Акцент: верхня частина грудей</text>
      <text x="180" y="64" fill="#334155" font-size="9" font-family="sans-serif">Лікті не розводити ширше 70°</text>
    </svg>

    <!-- 3. FLAT DUMBBELL PRESS -->
    <svg
      v-else-if="illustrationId === 'flat_dumbbell_press'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема жиму гантелей лежачи"
    >
      <rect x="60" y="105" width="160" height="12" rx="3" fill="#64748B" stroke="#94A3B8" stroke-width="1.5" />
      <circle cx="85" cy="94" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <path d="M96,98 L180,98" stroke="#1E293B" stroke-width="16" stroke-linecap="round" />
      <path d="M110,94 L145,94" stroke="#0284C7" stroke-width="6" stroke-linecap="round" />

      <!-- Dumbbells at Top & Bottom -->
      <rect x="110" y="32" width="16" height="8" rx="2" fill="#0284C7" />
      <rect x="136" y="32" width="16" height="8" rx="2" fill="#0284C7" />
      <path d="M115,92 L112,62 L116,40" fill="none" stroke="#0284C7" stroke-width="3" />
      <path d="M140,92 L144,62 L142,40" fill="none" stroke="#0284C7" stroke-width="3" />

      <text x="185" y="40" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ГАНТЕЛІ // НЕЙТРАЛЬНА ДУГА</text>
      <text x="185" y="56" fill="#334155" font-size="9" font-family="sans-serif">Глибше розтягування без ризику грифа</text>
    </svg>

    <!-- 4. PUSHUPS BOARD -->
    <svg
      v-else-if="illustrationId === 'pushups'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема віджимань на дошці"
    >
      <!-- Pushup Board on Floor -->
      <rect x="50" y="130" width="180" height="8" rx="2" fill="#38BDF8" />
      <rect x="100" y="122" width="12" height="8" rx="2" fill="#0284C7" />
      <rect x="150" y="122" width="12" height="8" rx="2" fill="#0284C7" />

      <!-- Athlete in Plank -->
      <line x1="70" y1="126" x2="160" y2="82" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />
      <line x1="120" y1="102" x2="155" y2="84" stroke="#0284C7" stroke-width="6" stroke-linecap="round" /> <!-- Chest / Core -->
      <circle cx="170" cy="76" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <!-- Arms on handles -->
      <path d="M145,88 L135,108 L140,122" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" />

      <!-- Plank Alignment Vector -->
      <line x1="60" y1="130" x2="175" y2="72" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3 3" />

      <text x="185" y="40" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">СТРУНКА ПЛАНКА</text>
      <text x="185" y="56" fill="#334155" font-size="9" font-family="sans-serif">Анатомічні рукоятки бережуть кисті</text>
      <text x="185" y="72" fill="#6E7787" font-size="9" font-family="sans-serif">Таз не провисає</text>
    </svg>

    <!-- 5. LEG PRESS 45 DEG -->
    <svg
      v-else-if="illustrationId === 'leg_press'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема жиму ногами"
    >
      <!-- Sled Rails 45 deg -->
      <line x1="80" y1="140" x2="200" y2="20" stroke="#94A3B8" stroke-width="3" />
      <!-- Seat & Backrest -->
      <line x1="60" y1="130" x2="85" y2="115" stroke="#64748B" stroke-width="10" stroke-linecap="round" />
      <line x1="85" y1="115" x2="65" y2="80" stroke="#64748B" stroke-width="10" stroke-linecap="round" />

      <!-- Sled Platform -->
      <rect x="160" y="35" width="40" height="12" transform="rotate(-45 160 35)" fill="#38BDF8" rx="3" />

      <!-- Athlete Body -->
      <circle cx="65" cy="70" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="80" y1="110" x2="72" y2="80" stroke="#1E293B" stroke-width="14" stroke-linecap="round" />

      <!-- Legs bending to platform -->
      <!-- Thigh (Quads Highlight) -->
      <line x1="82" y1="112" x2="115" y2="78" stroke="#0284C7" stroke-width="8" stroke-linecap="round" />
      <!-- Shin -->
      <line x1="115" y1="78" x2="160" y2="52" stroke="#334155" stroke-width="6" stroke-linecap="round" />

      <!-- Caution Circle on Knees -->
      <circle cx="115" cy="78" r="7" fill="none" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="2 2" />

      <text x="185" y="80" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">КУТ КОЛІНА 90°</text>
      <text x="185" y="96" fill="#38BDF8" font-size="9" font-family="monospace">БЕЗ БЛОКУВАННЯ ВГОРІ!</text>
      <text x="185" y="112" fill="#334155" font-size="9" font-family="sans-serif">Поперек притиснутий до спинки</text>
    </svg>

    <!-- 6. HIP THRUST -->
    <svg
      v-else-if="illustrationId === 'hip_thrust'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема Hip Thrust"
    >
      <!-- Bench -->
      <rect x="60" y="90" width="35" height="45" rx="3" fill="#64748B" stroke="#94A3B8" stroke-width="1.5" />

      <!-- Athlete Shoulders on Bench, Pelvis Extended Up -->
      <circle cx="68" cy="80" r="8" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="75" y1="90" x2="135" y2="90" stroke="#1E293B" stroke-width="14" stroke-linecap="round" />
      <!-- Glutes Focus -->
      <circle cx="130" cy="94" r="10" fill="#0284C7" />

      <!-- Legs to floor 90 deg -->
      <path d="M135,90 L180,90 L180,135" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Barbell on Hips -->
      <circle cx="130" cy="80" r="8" fill="#38BDF8" />
      <!-- Hip Drive Arrow -->
      <path d="M130,110 L130,85" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />

      <text x="195" y="55" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ПОВНИЙ РОЗГИН ТАЗА</text>
      <text x="195" y="72" fill="#334155" font-size="9" font-family="sans-serif">Гомілки вертикальні (90°)</text>
      <text x="195" y="88" fill="#6E7787" font-size="9" font-family="sans-serif">Погляд вперед на коліна</text>
    </svg>

    <!-- 7. SEATED CABLE ROW -->
    <svg
      v-else-if="illustrationId === 'seated_row'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема горизонтальної тяги"
    >
      <!-- Machine Bench & Footplate -->
      <rect x="50" y="115" width="80" height="10" rx="2" fill="#64748B" />
      <line x1="165" y1="100" x2="165" y2="135" stroke="#94A3B8" stroke-width="6" stroke-linecap="round" />

      <!-- Cable & Pulley -->
      <circle cx="210" cy="110" r="6" fill="#94A3B8" />
      <line x1="210" y1="110" x2="135" y2="105" stroke="#38BDF8" stroke-width="2" />

      <!-- Athlete Seated with Flat Back -->
      <circle cx="75" cy="70" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="75" y1="80" x2="75" y2="115" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />
      <!-- Lats Highlight -->
      <path d="M72,82 Q82,95 72,112" stroke="#0284C7" stroke-width="5" fill="none" stroke-linecap="round" />

      <!-- Legs to footplate -->
      <path d="M75,115 L120,115 L165,110" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Arms pulling to navel -->
      <path d="M75,85 L105,95 L135,105" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />

      <!-- Pull Arrow -->
      <path d="M140,95 L95,95" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round" />

      <text x="180" y="40" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ТЯГА ДО ЖИВОТА</text>
      <text x="180" y="56" fill="#334155" font-size="9" font-family="sans-serif">Зведення лопаток у кінці</text>
      <text x="180" y="72" fill="#6E7787" font-size="9" font-family="sans-serif">Корпус не розгойдується</text>
    </svg>

    <!-- 8. PULLUPS -->
    <svg
      v-else-if="illustrationId === 'pullups'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема підтягувань на турніку"
    >
      <!-- Pullup Bar -->
      <line x1="50" y1="20" x2="170" y2="20" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />

      <!-- Athlete in Pullup -->
      <!-- Hands on Bar -->
      <circle cx="85" cy="20" r="4" fill="#0284C7" />
      <circle cx="135" cy="20" r="4" fill="#0284C7" />

      <!-- Arms bent -->
      <path d="M85,20 L95,45 L105,52" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />
      <path d="M135,20 L125,45 L115,52" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />

      <!-- Head & Torso -->
      <circle cx="110" cy="38" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="110" y1="48" x2="110" y2="100" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />
      <!-- Lats V-Taper Highlight -->
      <path d="M102,52 L98,85 L110,95 L122,85 L118,52 Z" fill="#0284C7" opacity="0.85" />

      <!-- Legs hanging -->
      <line x1="110" y1="100" x2="110" y2="145" stroke="#334155" stroke-width="5" stroke-linecap="round" />

      <!-- Vertical Pull Arrow -->
      <path d="M145,90 L145,45" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />

      <text x="180" y="40" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ЛІКТІ ДО КИШЕНЬ</text>
      <text x="180" y="56" fill="#334155" font-size="9" font-family="sans-serif">Тяга грудьми до перекладини</text>
      <text x="180" y="72" fill="#6E7787" font-size="9" font-family="sans-serif">Без розгойдування ногами</text>
    </svg>

    <!-- 9. ONE ARM DUMBBELL ROW -->
    <svg
      v-else-if="illustrationId === 'dumbbell_row'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема тяги гантелі однією рукою"
    >
      <!-- Bench -->
      <rect x="60" y="95" width="120" height="10" rx="2" fill="#64748B" />
      <line x1="75" y1="105" x2="75" y2="145" stroke="#94A3B8" stroke-width="4" />
      <line x1="165" y1="105" x2="165" y2="145" stroke="#94A3B8" stroke-width="4" />

      <!-- Athlete: Knee & Hand on bench, flat back -->
      <circle cx="168" cy="72" r="8" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="160" y1="78" x2="100" y2="78" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />
      <!-- Lats Highlight -->
      <path d="M135,74 Q120,68 105,74" stroke="#0284C7" stroke-width="6" fill="none" stroke-linecap="round" />

      <!-- Support Arm & Knee on bench -->
      <line x1="155" y1="84" x2="155" y2="95" stroke="#334155" stroke-width="4" />
      <line x1="105" y1="84" x2="105" y2="95" stroke="#334155" stroke-width="5" />
      <line x1="85" y1="84" x2="75" y2="145" stroke="#334155" stroke-width="5" /> <!-- Floor leg -->

      <!-- Rowing Arm with Dumbbell pulling to hip -->
      <path d="M140,80 L125,60 L115,75" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />
      <rect x="110" y="70" width="10" height="14" rx="2" fill="#38BDF8" />
      <path d="M125,120 Q130,95 125,75" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2" />

      <text x="195" y="45" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ТРАЄКТОРІЯ ДО ПОЯСА</text>
      <text x="195" y="62" fill="#334155" font-size="9" font-family="sans-serif">Спина паралельна підлозі</text>
      <text x="195" y="78" fill="#6E7787" font-size="9" font-family="sans-serif">Не скручувати корпус вгору</text>
    </svg>

    <!-- 10. OVERHEAD PRESS -->
    <svg
      v-else-if="illustrationId === 'overhead_press'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема жиму гантелей над головою"
    >
      <circle cx="110" cy="52" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="110" y1="62" x2="110" y2="120" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />
      <!-- Shoulders Highlight -->
      <circle cx="95" cy="65" r="7" fill="#0284C7" />
      <circle cx="125" cy="65" r="7" fill="#0284C7" />

      <!-- Arms Pressing Dumbbells Overhead -->
      <path d="M95,65 L80,45 L85,25" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" />
      <path d="M125,65 L140,45 L135,25" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" />
      <rect x="78" y="18" width="14" height="8" rx="2" fill="#38BDF8" />
      <rect x="128" y="18" width="14" height="8" rx="2" fill="#38BDF8" />

      <text x="175" y="40" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ПЛОЩИНА ЛОПАТОК (30°)</text>
      <text x="175" y="56" fill="#334155" font-size="9" font-family="sans-serif">Лікті не розводити строго в боки</text>
      <text x="175" y="72" fill="#6E7787" font-size="9" font-family="sans-serif">Прес тримає поперек стабільним</text>
    </svg>

    <!-- 11. LATERAL RAISES -->
    <svg
      v-else-if="illustrationId === 'lateral_raises'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема розведення гантелей у сторони"
    >
      <circle cx="110" cy="38" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="110" y1="48" x2="110" y2="120" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />

      <!-- Lateral Delts -->
      <circle cx="98" cy="52" r="6" fill="#0284C7" />
      <circle cx="122" cy="52" r="6" fill="#0284C7" />

      <!-- Raised Arms Horizontal -->
      <path d="M98,52 L65,54 L40,58" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" />
      <path d="M122,52 L155,54 L180,58" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="38" cy="58" r="4" fill="#38BDF8" />
      <circle cx="182" cy="58" r="4" fill="#38BDF8" />

      <!-- Arc Arrows -->
      <path d="M75,95 Q55,75 48,64" stroke="#0284C7" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M145,95 Q165,75 172,64" stroke="#0284C7" stroke-width="2" fill="none" stroke-linecap="round" />

      <text x="195" y="45" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ВЕДЕННЯ ЛІКТЯМИ ВГОРУ</text>
      <text x="195" y="62" fill="#334155" font-size="9" font-family="sans-serif">Не піднімати вище лінії плечей</text>
      <text x="195" y="78" fill="#6E7787" font-size="9" font-family="sans-serif">Контрольований плавний спуск</text>
    </svg>

    <!-- 12. BICEPS / HAMMER CURLS -->
    <svg
      v-else-if="illustrationId === 'biceps_curl' || illustrationId === 'hammer_curl'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема згинань на біцепс"
    >
      <circle cx="90" cy="45" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="90" y1="55" x2="90" y2="120" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />

      <!-- Fixed Upper Arm -->
      <line x1="96" y1="60" x2="102" y2="92" stroke="#334155" stroke-width="4" stroke-linecap="round" />
      <!-- Biceps Muscle Peak -->
      <circle cx="106" cy="74" r="7" fill="#0284C7" />

      <!-- Forearm Curled Up -->
      <path d="M102,92 L116,66" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />
      <circle cx="118" cy="64" r="5" fill="#38BDF8" />

      <!-- Curl Arc Arrow -->
      <path d="M118,105 Q128,85 120,68" stroke="#0284C7" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <text x="155" y="45" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ФІКСАЦІЯ ЛІКТІВ</text>
      <text x="155" y="62" fill="#334155" font-size="9" font-family="sans-serif">Лікті не відходять назад</text>
      <text x="155" y="78" fill="#6E7787" font-size="9" font-family="sans-serif">Повна супінація та піковий стиск</text>
    </svg>

    <!-- 13. TRICEPS OVERHEAD EXTENSION -->
    <svg
      v-else-if="illustrationId === 'triceps_extension'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема розгинання на трицепс"
    >
      <circle cx="100" cy="65" r="9" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <line x1="100" y1="75" x2="100" y2="135" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />

      <!-- Upper Arm Pointed Vertically -->
      <line x1="100" y1="75" x2="104" y2="35" stroke="#0284C7" stroke-width="5" stroke-linecap="round" />
      <!-- Triceps Muscle Back -->
      <path d="M98,65 Q94,48 98,40" stroke="#0284C7" stroke-width="5" fill="none" />

      <!-- Forearm bent behind head -->
      <path d="M104,35 L82,50" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
      <circle cx="80" cy="52" r="5" fill="#38BDF8" />

      <!-- Extension Arrow Upwards -->
      <path d="M78,42 Q86,25 102,22" stroke="#0284C7" stroke-width="2.5" fill="none" stroke-linecap="round" />

      <text x="145" y="45" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ДОВГА ГОЛОВКА ТРИЦЕПСА</text>
      <text x="145" y="62" fill="#334155" font-size="9" font-family="sans-serif">Глибоке розтягнення за головою</text>
      <text x="145" y="78" fill="#6E7787" font-size="9" font-family="sans-serif">Лікті не розводити в боки</text>
    </svg>

    <!-- 14. KETTLEBELL SWING -->
    <svg
      v-else-if="illustrationId === 'kettlebell_swing'"
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема махів гирею"
    >
      <circle cx="95" cy="55" r="8" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
      <!-- Hip Hinge Angle -->
      <line x1="95" y1="62" x2="80" y2="95" stroke="#1E293B" stroke-width="12" stroke-linecap="round" />
      <line x1="80" y1="95" x2="90" y2="140" stroke="#334155" stroke-width="5" stroke-linecap="round" />
      <!-- Glutes Power Circle -->
      <circle cx="75" cy="95" r="9" fill="#0284C7" />

      <!-- Arms with Kettlebell swinging forward -->
      <line x1="92" y1="70" x2="145" y2="70" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="152" cy="70" r="8" fill="#38BDF8" />

      <!-- Trajectory Arc -->
      <path d="M78,115 Q115,115 148,78" stroke="#0284C7" stroke-width="2" stroke-dasharray="3 3" fill="none" />

      <text x="175" y="45" fill="#0284C7" font-size="10" font-family="monospace" font-weight="bold">ТАЗОВИЙ ШАРНІР (HIP HINGE)</text>
      <text x="175" y="62" fill="#334155" font-size="9" font-family="sans-serif">Рух за рахунок сідниць, не рук</text>
      <text x="175" y="78" fill="#6E7787" font-size="9" font-family="sans-serif">Прес затиснутий у верхній точці</text>
    </svg>

    <!-- 15. DEFAULT DYNAMIC ARCHETYPE (FOR REMAINING EXERCISES) -->
    <svg
      v-else
      viewBox="0 0 320 160"
      class="diagram-svg"
      aria-label="Схема виконання вправи"
    >
      <rect x="50" y="40" width="110" height="80" rx="8" fill="#1E293B" stroke="#94A3B8" stroke-width="1.5" />
      <circle cx="85" cy="65" r="10" fill="#64748B" stroke="#0284C7" stroke-width="2" />
      <path d="M85,75 L85,105 L120,95" stroke="#0284C7" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M100,55 L135,75" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
      <!-- Motion Arrows -->
      <path d="M125,75 L145,55" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round" />

      <text x="180" y="55" fill="#0284C7" font-size="11" font-family="monospace" font-weight="bold">БІОМЕХАНІЧНИЙ РУХ</text>
      <text x="180" y="74" fill="#0F172A" font-size="10" font-family="sans-serif">{{ name }}</text>
      <text x="180" y="92" fill="#334155" font-size="9" font-family="sans-serif">Плавний темп 2-0-1 без ривків</text>
      <text x="180" y="106" fill="#6E7787" font-size="8.5" font-family="sans-serif">Постійний контроль постави</text>
    </svg>

    <div class="tech-caption">
      <span>КОНТРОЛЬ НАВАНТАЖЕННЯ:</span>
      <strong>2 секунди опускання • 1 секунда скорочення</strong>
    </div>
  </div>
</template>

<style scoped>
.illustration-card {
  background: #FFFFFF;
  border: 1px solid #BAE6FD;
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.05);
}

.tech-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid #E0F2FE;
  padding-bottom: 6px;
}

.tech-spec {
  color: #0284C7;
  font-weight: 800;
}

.tech-indicator {
  color: #64748B;
  font-weight: 600;
  font-family: inherit;
}

.diagram-svg {
  width: 100%;
  height: 140px;
  overflow: visible;
}

.tech-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.72rem;
  color: #475569;
  border-top: 1px solid #E0F2FE;
  padding-top: 6px;
}

.tech-caption strong {
  color: #0F172A;
}
</style>

