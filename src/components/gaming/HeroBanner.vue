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
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  alt: { type: String, default: 'Featured promotion' }
})
</script>
