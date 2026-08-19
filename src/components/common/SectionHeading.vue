<template>
  <div class="mb-3 flex items-center gap-2">
    <span class="text-brand-gold-500">
      <AppIcon :name="icon" :size="18" />
    </span>
    <h2 class="text-sm font-bold uppercase tracking-wide text-app-primary sm:text-base">{{ title }}</h2>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: 'fire' }
})
</script>
