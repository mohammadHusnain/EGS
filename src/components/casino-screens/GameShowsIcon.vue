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
    <path v-for="(d, i) in paths[name] || paths.default" :key="i" :d="d" :fill="filled.includes(name) ? 'currentColor' : 'none'" />
  </svg>
</template>

<script setup>
// Small local icon set for the Game Shows screen — kept separate from the
// shared AppIcon so this page doesn't collide with other in-flight edits.
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 18 },
  strokeWidth: { type: [Number, String], default: 2 }
})

const filled = ['star-filled', 'live-dot']

const paths = {
  settings: [
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    'M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H20a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z'
  ],
  refresh: ['M4 4v5h5', 'M20 20v-5h-5', 'M4.5 9a8 8 0 0 1 14.2-3.2L20 9', 'M19.5 15a8 8 0 0 1-14.2 3.2L4 15'],
  'star-filled': ['M12 3.5l2.6 5.3 5.9.8-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.8L12 3.5Z'],
  star: ['M12 3.5l2.6 5.3 5.9.8-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.8L12 3.5Z'],
  mic: ['M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z', 'M5 11a7 7 0 0 0 14 0', 'M12 18v4', 'M9 22h6'],
  chip: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z', 'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z', 'M12 2v3', 'M12 19v3', 'M2 12h3', 'M19 12h3', 'M4.9 4.9l2.1 2.1', 'M17 17l2.1 2.1', 'M19.1 4.9 17 7', 'M7 17l-2.1 2.1'],
  'live-dot': ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'],
  bolt: ['M13 2 4 14h6l-1 8 9-12h-6l1-8Z'],
  history: ['M3 12a9 9 0 1 0 3-6.7', 'M3 4v5h5', 'M12 7v5l4 2'],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
