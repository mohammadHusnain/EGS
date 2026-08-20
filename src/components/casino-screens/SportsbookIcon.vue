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
    <template v-if="name === 'football'">
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </template>
  </svg>
</template>

<script setup>
// Small local icon set for the Sportsbook screen — kept separate from the
// shared AppIcon.vue to avoid touching a file other pages depend on.
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 2 }
})

const paths = {
  boxing: [
    'M7 12V8a3 3 0 0 1 3-3h1a2 2 0 0 1 2 2',
    'M13 7a2 2 0 0 1 4 0v2',
    'M17 8a2 2 0 0 1 4 0v5a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.2-3',
    'M7 12a2 2 0 0 0-4 0v1a3 3 0 0 0 3 3h1'
  ],
  americanFootball: [
    'M4 12c0-3 4-8 8-8s8 5 8 8-4 8-8 8-8-5-8-8Z',
    'M6.5 9.5l11 5',
    'M9 9l1 1M11 11l1 1M13 13l1 1'
  ],
  football: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 8l3.5 2.5-1.3 4H9.8l-1.3-4Z', 'M12 3v5M4.5 9l3.5 1.5M19.5 9l-3.5 1.5M8 20l1.8-4.5M16 20l-1.8-4.5'],
  basketball: [
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    'M3 12h18',
    'M12 3c2.2 2.3 3.5 5.6 3.5 9s-1.3 6.7-3.5 9',
    'M12 3c-2.2 2.3-3.5 5.6-3.5 9s1.3 6.7 3.5 9',
    'M4.5 6.5c2 1.6 4.7 2.5 7.5 2.5s5.5-.9 7.5-2.5',
    'M4.5 17.5c2-1.6 4.7-2.5 7.5-2.5s5.5.9 7.5 2.5'
  ],
  tennis: [
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    'M4.2 8.5C7 10 9.3 12.6 10.7 16',
    'M19.8 8.5c-2.8 1.5-5.1 4.1-6.5 7.5'
  ],
  iceHockey: [
    'M3 18l6-13 2 1-5.2 12.7Z',
    'M9.5 18.5l2-1',
    'M13 15.5h7a1.5 1.5 0 0 1 0 3H14a1.5 1.5 0 0 1-1-2.6Z'
  ],
  baseball: [
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    'M5.2 6.2c2 1.6 3.2 4 3.2 6.8s-1.2 5.2-3.2 6.8',
    'M18.8 6.2c-2 1.6-3.2 4-3.2 6.8s1.2 5.2 3.2 6.8'
  ],
  filter: ['M4 6h16', 'M7 12h10', 'M10 18h4'],
  clock: ['M12 8v4l3 2', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'],
  trending: ['M3 17l6-6 4 4 8-8', 'M15 7h6v6'],
  layers: ['M12 3 3 8l9 5 9-5-9-5Z', 'M3 13l9 5 9-5', 'M3 8l9 5 9-5'],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
