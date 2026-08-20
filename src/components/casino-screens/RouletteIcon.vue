<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
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
  size: { type: [Number, String], default: 18 }
})

// Small set of icons specific to the roulette play screen that aren't in the
// shared AppIcon.vue map yet (kept local to avoid touching shared files).
const paths = {
  gear: [
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    'M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H2.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.1 1.7 1.7 0 0 0-.34-1.87l-.06-.06A2 2 0 1 1 6.58 2.6l.06.06a1.7 1.7 0 0 0 1.87.34H8.6a1.7 1.7 0 0 0 1.04-1.56V1.5a2 2 0 1 1 4 0v.09c0 .69.41 1.3 1.04 1.56.62.26 1.34.13 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.06c.26.63.87 1.04 1.56 1.04h.09a2 2 0 1 1 0 4h-.09c-.69 0-1.3.41-1.56 1.04Z'
  ],
  shuffle: [
    'M17 3h4v4',
    'M21 3l-7 7',
    'M3 16v3a2 2 0 0 0 2 2h3',
    'M17 21h4v-4',
    'M21 21l-7-7',
    'M3 8V5a2 2 0 0 1 2-2h3'
  ],
  star: ['M12 3l2.6 5.4 5.9.9-4.3 4.1 1 5.9L12 16.7 6.8 19.3l1-5.9L3.5 9.3l5.9-.9L12 3Z'],
  fullscreen: ['M8 3H5a2 2 0 0 0-2 2v3', 'M16 3h3a2 2 0 0 1 2 2v3', 'M8 21H5a2 2 0 0 1-2-2v-3', 'M16 21h3a2 2 0 0 0 2-2v-3'],
  chip: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 3v2.5', 'M12 18.5V21', 'M3 12h2.5', 'M18.5 12H21'],
  live: ['M12 2v4', 'M4.9 4.9l2.8 2.8', 'M2 12h4', 'M4.9 19.1l2.8-2.8', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
