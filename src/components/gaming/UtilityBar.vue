<template>
  <div class="flex items-center justify-between rounded-xl bg-brand-blue-700 px-4 py-2.5 text-white shadow">
    <button type="button" class="flex items-center gap-2 text-xs font-medium opacity-90 transition hover:opacity-100 sm:text-sm">
      <AppIcon name="sound" :size="16" />
      Sound On
    </button>
    <button type="button" class="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold transition hover:bg-white/25 sm:text-sm">
      <AppIcon name="bell" :size="16" />
      Rewards
    </button>
  </div>
</template>

<script setup>
import AppIcon from '../common/AppIcon.vue'
</script>
