<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="shrink-0"
    role="img"
    :aria-label="name"
  >
    <path v-for="(d, i) in paths[name] || paths.default" :key="i" :d="d" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 2 }
})

// Small local icon set for the Slots play screen — kept separate from the
// shared AppIcon.vue to avoid touching a file other pages depend on.
const paths = {
  gear: [
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    'M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 17.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 13a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 6.98a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 2.6c.36-.15.75-.23 1.16-.23H10a2 2 0 1 1 4 0v.09c0 .58.32 1.1.83 1.36.42.18.9.13 1.27-.13l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.19.5.65.85 1.19.85H20a2 2 0 1 1 0 4h-.09c-.54 0-1 .35-1.19.85Z'
  ],
  refresh: ['M4 4v5h5', 'M20 20v-5h-5', 'M4.6 15a8 8 0 0 0 14.4 2.5', 'M19.4 9A8 8 0 0 0 5 6.5'],
  star: ['M12 2.5l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.7 6 20l1.5-6.5-5-4.4 6.6-.6L12 2.5Z'],
  fairplay: ['M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z', 'M9.5 12l1.8 1.8L14.8 10'],
  autoplay: ['M8 5.5v13l10-6.5-10-6.5Z'],
  spin: ['M12 4a8 8 0 0 1 7.75 6', 'M20 4v6h-6', 'M12 20a8 8 0 0 1-7.75-6', 'M4 20v-6h6'],
  minus: ['M5 12h14'],
  plus: ['M12 5v14', 'M5 12h14'],
  wallet: ['M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3', 'M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H8a2 2 0 0 0 0 4h11'],
  trophy: ['M8 4h8v4a4 4 0 0 1-8 0V4Z', 'M8 5H5a3 3 0 0 0 3 4', 'M16 5h3a3 3 0 0 1-3 4', 'M12 12v3', 'M9 20h6', 'M10 16h4l1 4H9l1-4Z'],
  sparkle: ['M12 2v4', 'M12 18v4', 'M2 12h4', 'M18 12h4', 'M5 5l2.5 2.5', 'M16.5 16.5 19 19', 'M19 5l-2.5 2.5', 'M7.5 16.5 5 19'],
  document: ['M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z', 'M14 3v5h5', 'M9 13h6', 'M9 17h6'],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
