<template>
  <div class="relative w-full overflow-hidden rounded-2xl shadow-card">
    <div class="relative aspect-[16/7] w-full sm:aspect-[21/7] lg:aspect-[28/7]">
      <img
        :src="image"
        :alt="alt"
        loading="eager"
        decoding="async"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        v-if="title"
        class="glass-card-strong absolute inset-x-3 bottom-3 !rounded-xl px-3.5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 sm:inset-x-5 sm:bottom-5 sm:px-5 sm:py-3"
      >
        <p class="text-sm font-bold text-app-primary drop-shadow-sm sm:text-lg">{{ title }}</p>
        <p v-if="subtitle" class="mt-0.5 line-clamp-2 text-[11px] text-app-secondary sm:text-sm">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Single shared source for the hero banner image. Pages pass their own
// `image`/`title`/`subtitle` so each page gets a distinct, on-brand banner.
import defaultBanner from '@/assets/games/crop_banner_a.png'

defineProps({
  image: { type: String, default: () => defaultBanner },
  alt: { type: String, default: 'Featured promotion' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})
</script>
