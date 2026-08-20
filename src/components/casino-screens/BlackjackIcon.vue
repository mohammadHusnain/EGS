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
    <circle v-if="name === 'gear'" cx="12" cy="12" r="3" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 2 }
})

// Small icon set for the Blackjack play screen — not present in the shared
// AppIcon.vue map, kept local to avoid touching shared files.
const paths = {
  gear: [
    'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z'
  ],
  shuffle: [
    'M16 3h5v5',
    'M4 20 21 3',
    'M21 16v5h-5',
    'M15 15l6 6',
    'M4 4l5 5'
  ],
  star: [
    'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z'
  ],
  chip: [
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
    'M12 3v2.2',
    'M12 18.8V21',
    'M4.9 4.9l1.6 1.6',
    'M17.5 17.5l1.6 1.6',
    'M3 12h2.2',
    'M18.8 12H21',
    'M4.9 19.1l1.6-1.6',
    'M17.5 6.5l1.6-1.6'
  ],
  video: [
    'M4 6h11v12H4z',
    'M15 10l5-3v10l-5-3z'
  ],
  volume: [
    'M5 9v6h4l5 4V5L9 9H5Z',
    'M17 9a4 4 0 0 1 0 6'
  ],
  expand: [
    'M9 4H4v5',
    'M20 15v5h-5',
    'M4 9l6-5',
    'M20 20l-6-6'
  ],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
