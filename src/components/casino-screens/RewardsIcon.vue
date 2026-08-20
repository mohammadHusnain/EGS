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
  size: { type: [Number, String], default: 16 }
})

// Small set of icons not present in the shared AppIcon.vue, kept local to
// the rewards screens so we don't touch the shared icon file.
const paths = {
  sparkle: [
    'M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z',
    'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z'
  ],
  lock: [
    'M6 11V8a6 6 0 0 1 12 0v3',
    'M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z',
    'M12 15v3'
  ],
  bolt: ['M13 2 4 14h6l-1 8 9-12h-6l1-8Z'],
  timer: ['M12 8v5l3 2', 'M12 2v2', 'M20 12a8 8 0 1 1-8-8', 'M18.5 5.5l-1.4 1.4'],
  trophy: [
    'M8 4h8v5a4 4 0 0 1-8 0V4Z',
    'M8 5H5a3 3 0 0 0 3 3',
    'M16 5h3a3 3 0 0 1-3 3',
    'M10 15h4v3h-4z',
    'M8 21h8',
    'M12 18v3'
  ],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
