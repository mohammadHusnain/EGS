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
    <template v-if="name === 'user'">
      <circle cx="12" cy="8" r="3.2" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 2 }
})

const paths = {
  menu: ['M4 6h16M4 12h16M4 18h16'],
  home: ['M4 11.5 12 4l8 7.5', 'M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9'],
  slots: ['M4 4h16v16H4z', 'M4 10h16', 'M10 4v6', 'M14 4v6', 'M7 15h.01', 'M12 15h.01', 'M17 15h.01'],
  live: ['M12 2v4', 'M4.9 4.9l2.8 2.8', 'M2 12h4', 'M4.9 19.1l2.8-2.8', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  fire: ['M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 .5 2-1 3-2 3-2 0-2-2-1-4 .5-1 .5-2.5-2-4Z', 'M8 15a4 4 0 1 0 8 0c0-2-1.5-3-2-5-1 1-2 2-2 3-1-.5-1.5-1.5-2-2-1 1.5-2 2.5-2 4Z'],
  controller: ['M6 9h12l2 8a2 2 0 0 1-2 2.4c-1 0-1.6-.5-2-1.4l-1-2H9l-1 2c-.4.9-1 1.4-2 1.4A2 2 0 0 1 4 17l2-8Z', 'M9 12h-2m1-1v2', 'M16 12h.01', 'M18 10h.01'],
  fish: ['M3 12c3-4 8-6 12-4 2 1 4 2 6 1-1 2-1 4 0 6-2-1-4 0-6 1-4 2-9 0-12-4Z', 'M15 10l3-3', 'M15 14l3 3', 'M6.5 11.5h.01'],
  pvp: ['M6 4l6 6-6 6', 'M18 4l-6 6 6 6', 'M4 20h16'],
  sports: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z', 'M8 9l4-3 4 3-1.5 4.5h-5L8 9Z', 'M6.5 9 4 12', 'M17.5 9 20 12', 'M9 15.5 8 20', 'M15 15.5l1 4.5'],
  cock: ['M12 3c3 0 5 2 5 5 0 2-1 3-2 4l3 8H8l3-8c-1-1-2-2-2-4 0-3 2-5 3-5Z', 'M9 8c-2-1-3-3-3-5 2 0 4 1 5 3'],
  gift: ['M4 9h16v11H4z', 'M4 9V7a2 2 0 0 1 2-2h1a2 2 0 0 1 0 4', 'M20 9V7a2 2 0 0 0-2-2h-1a2 2 0 0 0 0 4', 'M12 9v11', 'M12 5c-1-2-4-2-4 0s3 2 4 0Z', 'M12 5c1-2 4-2 4 0s-3 2-4 0Z'],
  headset: ['M4 13a8 8 0 0 1 16 0', 'M4 13v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1Z', 'M20 13v4a2 2 0 0 1-2 2h-1v-6h2a1 1 0 0 1 1 1Z', 'M10 19h2a2 2 0 0 0 2-2'],
  login: ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'M10 17l5-5-5-5', 'M15 12H3'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  dashboard: ['M4 4h7v7H4z', 'M13 4h7v4h-7z', 'M13 11h7v9h-7z', 'M4 14h7v6H4z'],
  sound: ['M5 9v6h4l5 4V5L9 9H5Z', 'M17 9a4 4 0 0 1 0 6', 'M19.5 6.5a8 8 0 0 1 0 11'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z', 'M10 20a2 2 0 0 0 4 0'],
  withdraw: ['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'],
  transfer: ['M7 7h10l-3-3', 'M17 17H7l3 3', 'M7 7v6a4 4 0 0 0 4 4h6'],
  language: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z', 'M2 12h20', 'M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10Z'],
  sun: ['M12 4V2', 'M12 22v-2', 'M4 12H2', 'M22 12h-2', 'M5 5l-1.5-1.5', 'M20.5 20.5 19 19', 'M5 19l-1.5 1.5', 'M20.5 3.5 19 5', 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z'],
  moon: ['M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z'],
  chevronRight: ['M9 6l6 6-6 6'],
  chevronDown: ['M6 9l6 6 6-6'],
  crown: ['M4 8l4 3 4-6 4 6 4-3-2 10H6L4 8Z'],
  search: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z', 'M21 21l-4.35-4.35'],
  default: ['M12 2 2 22h20L12 2Z']
}
</script>
